
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Navigate } from "react-router-dom";
import { Rocket, Sparkles, Download, Edit, Share, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const GameCreator = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [gamePrompt, setGamePrompt] = useState("");
  const [gameStory, setGameStory] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [pixelStyle, setPixelStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGame, setGeneratedGame] = useState<any>(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleGenerateGame = async () => {
    if (!gamePrompt.trim() || !gameStory.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a descrição e história do jogo!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-game', {
        body: {
          gamePrompt,
          gameStory,
          gameGenre,
          pixelStyle,
          userId: user.id
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setGeneratedGame({
          id: data.gameId,
          name: data.gameTitle,
          thumbnail: "/placeholder.svg",
          downloadUrl: data.downloadUrl,
          gameData: data.gameData
        });

        toast({
          title: "Jogo criado com sucesso!",
          description: "Seu jogo está pronto para download!"
        });
      } else {
        throw new Error(data.error || 'Erro desconhecido');
      }
    } catch (error: any) {
      console.error('Erro ao gerar jogo:', error);
      toast({
        title: "Erro na geração",
        description: error.message || "Ocorreu um erro ao gerar o jogo. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-yellow-400" />
          <h1 className="text-2xl font-bold">PixelForge AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Olá, {user.email}</span>
          <Link to="/">
            <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black">
              Início
            </Button>
          </Link>
          <Button 
            onClick={signOut}
            variant="outline" 
            className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
          >
            Sair
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Crie Seu Jogo dos Sonhos
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descreva suas ideias e nossa IA transformará em um jogo jogável usando ChatGPT-4.5 e Unity
          </p>
        </div>

        {!generatedGame ? (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Game Description */}
            <Card className="bg-zinc-900/80 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Descrição do Jogo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="gamePrompt" className="text-yellow-400 font-medium">
                    Como será seu jogo?
                  </Label>
                  <Textarea
                    id="gamePrompt"
                    placeholder="Ex: Um jogo de plataforma onde o jogador é um robô que precisa coletar energia para salvar sua cidade. O jogador pode pular, correr e atirar lasers..."
                    value={gamePrompt}
                    onChange={(e) => setGamePrompt(e.target.value)}
                    className="mt-2 min-h-32 bg-zinc-800 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-yellow-400 font-medium">Gênero</Label>
                    <Select value={gameGenre} onValueChange={setGameGenre}>
                      <SelectTrigger className="bg-zinc-800 border-yellow-500/30 text-white">
                        <SelectValue placeholder="Escolha o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platformer">Plataforma</SelectItem>
                        <SelectItem value="rpg">RPG</SelectItem>
                        <SelectItem value="action">Ação</SelectItem>
                        <SelectItem value="puzzle">Puzzle</SelectItem>
                        <SelectItem value="adventure">Aventura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-yellow-400 font-medium">Estilo Pixel</Label>
                    <Select value={pixelStyle} onValueChange={setPixelStyle}>
                      <SelectTrigger className="bg-zinc-800 border-yellow-500/30 text-white">
                        <SelectValue placeholder="Estilo gráfico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8bit">8-bit Clássico</SelectItem>
                        <SelectItem value="16bit">16-bit Detalhado</SelectItem>
                        <SelectItem value="modern">Pixel Art Moderno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Game Story */}
            <Card className="bg-zinc-900/80 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Edit className="mr-2 h-5 w-5" />
                  História do Jogo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="gameStory" className="text-yellow-400 font-medium">
                    Conte a história do seu jogo
                  </Label>
                  <Textarea
                    id="gameStory"
                    placeholder="Ex: No ano 2150, os robôs viviam em harmonia na cidade de Neo-Tokyo. Mas um vírus misterioso começou a drenar toda a energia da cidade. Nosso herói, um pequeno robô chamado Pixel, deve atravessar níveis perigosos para encontrar a fonte do problema..."
                    value={gameStory}
                    onChange={(e) => setGameStory(e.target.value)}
                    className="mt-2 min-h-48 bg-zinc-800 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Generated Game Display */
          <Card className="bg-zinc-900/80 border-yellow-500/30 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-yellow-400 text-2xl">
                🎉 Seu Jogo Está Pronto!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-zinc-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">{generatedGame.name}</h3>
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Gamepad2 className="h-16 w-16 text-black" />
                </div>
                <p className="text-gray-300">Jogo gerado com sucesso usando ChatGPT-4.5 e Unity!</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  onClick={() => window.open(generatedGame.downloadUrl, '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar .exe
                </Button>
                <Button 
                  variant="outline" 
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                  onClick={() => setGeneratedGame(null)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Criar Outro
                </Button>
                <Button 
                  variant="outline" 
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                >
                  <Share className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generate Button */}
        {!generatedGame && (
          <div className="text-center">
            <Button 
              onClick={handleGenerateGame}
              disabled={isGenerating}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-12 py-6 rounded-full text-xl shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                  Gerando com IA...
                </>
              ) : (
                <>
                  <Rocket className="mr-3 h-6 w-6" />
                  Gerar Jogo com IA
                </>
              )}
            </Button>
            
            {isGenerating && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="bg-zinc-900/80 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-yellow-400 font-medium mb-4">🤖 Processo de Criação com IA:</div>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                      Analisando sua descrição com ChatGPT-4.5...
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                      Gerando código C# para Unity...
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                      Compilando projeto Unity...
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                      Preparando executável para download...
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCreator;
