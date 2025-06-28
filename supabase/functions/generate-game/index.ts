
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const unityCloudApiKey = Deno.env.get('UNITY_CLOUD_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { gamePrompt, gameStory, gameGenre, pixelStyle, userId } = await req.json();

    console.log('Gerando jogo para usuário:', userId);
    
    // Criar cliente Supabase com service role para bypass RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Verificar se o usuário existe na tabela profiles
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.log('Criando perfil para usuário:', userId);
      const { error: insertProfileError } = await supabaseClient
        .from('profiles')
        .insert({
          id: userId,
          username: 'Usuario'
        });
      
      if (insertProfileError) {
        console.error('Erro ao criar perfil:', insertProfileError);
      }
    }

    // Criar registro do jogo no banco
    const { data: gameRecord, error: insertError } = await supabaseClient
      .from('games')
      .insert({
        user_id: userId,
        title: 'Jogo Gerado por IA',
        description: gamePrompt,
        story: gameStory,
        genre: gameGenre,
        pixel_style: pixelStyle,
        status: 'generating'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao criar registro do jogo:', insertError);
      throw new Error(`Erro ao criar registro do jogo: ${insertError.message}`);
    }

    console.log('Registro do jogo criado:', gameRecord.id);

    // Verificar se a chave do OpenAI está configurada
    if (!openAIApiKey) {
      throw new Error('Chave da API OpenAI não configurada');
    }

    // Gerar código do jogo com ChatGPT
    const gamePromptForAI = `
    Crie um jogo em Unity usando C# com as seguintes especificações:
    
    Descrição: ${gamePrompt}
    História: ${gameStory}
    Gênero: ${gameGenre}
    Estilo: ${pixelStyle}
    
    Gere código C# completo para Unity incluindo:
    1. Scripts de gameplay
    2. Scripts de UI
    3. Sistema de pontuação
    4. Controles do jogador
    5. Estrutura de cenas
    
    Formate a resposta como JSON com a estrutura:
    {
      "gameTitle": "Nome do Jogo",
      "scripts": [
        {
          "filename": "NomeDoScript.cs",
          "content": "código do script"
        }
      ],
      "sceneStructure": "descrição da estrutura das cenas",
      "gameplayInstructions": "instruções de como jogar"
    }
    `;

    console.log('Chamando OpenAI API...');

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um desenvolvedor expert em Unity e C# especializado em criar jogos em pixel art. Gere código funcional e completo.' 
          },
          { role: 'user', content: gamePromptForAI }
        ],
        max_tokens: 4000,
        temperature: 0.7
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('Erro na resposta do OpenAI:', errorText);
      throw new Error(`Erro na API OpenAI: ${openAIResponse.status} - ${errorText}`);
    }

    const openAIData = await openAIResponse.json();
    const generatedGameCode = openAIData.choices[0].message.content;

    console.log('Código gerado pelo ChatGPT');

    // Parsear resposta do ChatGPT
    let gameData;
    try {
      gameData = JSON.parse(generatedGameCode);
    } catch (e) {
      console.log('Erro ao parsear JSON, usando estrutura básica');
      // Se não conseguir parsear como JSON, criar estrutura básica
      gameData = {
        gameTitle: "Jogo Pixel Art Gerado",
        scripts: [{
          filename: "GameManager.cs",
          content: generatedGameCode
        }],
        sceneStructure: "Estrutura básica de jogo",
        gameplayInstructions: "Use as setas para mover e espaço para pular"
      };
    }

    // Simular criação do projeto Unity (em produção, aqui você integraria com Unity Cloud Build)
    const unityProjectData = {
      projectName: gameData.gameTitle,
      scripts: gameData.scripts,
      sceneStructure: gameData.sceneStructure,
      buildSettings: {
        platform: "PC",
        format: "exe"
      }
    };

    // Simular URL de download (em produção, seria o link real do Unity Cloud Build)
    const downloadUrl = `https://exemplo.com/downloads/${gameRecord.id}/game.exe`;

    // Atualizar registro do jogo no banco
    const { error: updateError } = await supabaseClient
      .from('games')
      .update({
        title: gameData.gameTitle,
        game_code: generatedGameCode,
        unity_project_data: unityProjectData,
        download_url: downloadUrl,
        status: 'completed'
      })
      .eq('id', gameRecord.id);

    if (updateError) {
      console.error('Erro ao atualizar jogo:', updateError);
      throw new Error(`Erro ao atualizar jogo: ${updateError.message}`);
    }

    console.log('Jogo gerado com sucesso!');

    return new Response(JSON.stringify({
      success: true,
      gameId: gameRecord.id,
      gameTitle: gameData.gameTitle,
      downloadUrl: downloadUrl,
      gameData: unityProjectData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na geração do jogo:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
