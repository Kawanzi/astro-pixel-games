
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Particles from "@/components/Particles";
import { Gamepad2, Sparkles, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-950 text-yellow-400 relative overflow-hidden">
      <Particles />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-yellow-400 animate-pulse" />
          <span className="text-2xl font-bold tracking-wider">PixelForge AI</span>
        </div>
        <nav className="flex space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              Criar Conta
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center animate-fade-in">
          <div className="mb-8 animate-pulse">
            <Sparkles className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 tracking-wider drop-shadow-2xl mb-6 animate-fade-in">
            Crie Jogos Pixel Art
            <br />
            <span className="text-3xl md:text-5xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              com Inteligência Artificial
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Descreva o jogo dos seus sonhos e veja a mágica acontecer. 
            Nossa IA transforma suas ideias em jogos jogáveis com executáveis prontos para download.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/create">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-yellow-500/25 transition-all duration-300">
                <Zap className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-xl transition-all duration-300">
                Ver Exemplos
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="text-2xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">IA Avançada</h3>
              <p className="text-gray-300">ChatGPT interpreta suas ideias e cria jogos únicos</p>
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Execução Rápida</h3>
              <p className="text-gray-300">Seus jogos ficam prontos em minutos, não meses</p>
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="text-2xl mb-3">💾</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Download Direto</h3>
              <p className="text-gray-300">Baixe seu jogo em .exe e compartilhe com amigos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
