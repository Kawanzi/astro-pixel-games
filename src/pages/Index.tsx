
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Sparkles, Gamepad2, Zap, Code, Palette } from "lucide-react";
import Particles from "@/components/Particles";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-950 text-yellow-400 relative overflow-hidden">
      <Particles />
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-yellow-400" />
          <h1 className="text-2xl font-bold">PixelForge AI</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/create">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  Criar Jogo
                </Button>
              </Link>
              <Button 
                onClick={signOut}
                variant="outline" 
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black">
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  Criar Conta
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-pulse">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
              <Gamepad2 className="h-16 w-16 text-black" />
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent tracking-tight">
            Crie Jogos em Pixel Art
            <br />
            <span className="text-3xl md:text-5xl">com Inteligência Artificial</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Descreva o jogo dos seus sonhos e nossa IA avançada transformará suas ideias em um jogo jogável usando 
            <strong className="text-yellow-400"> ChatGPT-4.5</strong> e <strong className="text-yellow-400">Unity</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to={user ? "/create" : "/register"}>
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-12 py-6 rounded-full text-xl shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
              >
                <Rocket className="mr-3 h-6 w-6" />
                {user ? "Criar Jogo Agora" : "Começar Gratuitamente"}
              </Button>
            </Link>
            
            {!user && (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-12 py-6 rounded-full text-xl transition-all duration-300"
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Já tenho conta
                </Button>
              </Link>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-zinc-900/60 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="bg-yellow-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">IA Avançada</h3>
              <p className="text-gray-300">
                Powered by ChatGPT-4.5, nossa IA entende suas ideias e gera código de jogo inteligente
              </p>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="bg-yellow-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Unity Integration</h3>
              <p className="text-gray-300">
                Jogos criados com Unity Engine profissional, prontos para download e jogabilidade
              </p>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="bg-yellow-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Pixel Art</h3>
              <p className="text-gray-300">
                Visuais nostálgicos em pixel art com diferentes estilos: 8-bit, 16-bit e moderno
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400">
        <p>&copy; 2024 PixelForge AI. Transformando ideias em jogos com o poder da IA.</p>
      </footer>
    </div>
  );
};

export default Index;
