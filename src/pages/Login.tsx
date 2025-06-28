
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { LogIn, User, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();

  if (user) {
    return <Navigate to="/create" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    await signIn(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900/80 border-yellow-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-yellow-500/10 rounded-full w-fit">
              <LogIn className="h-8 w-8 text-yellow-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-yellow-400 tracking-wide">
              Entrar no Universo
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Acesse sua conta e continue criando jogos incríveis
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-yellow-400 font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-yellow-400/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-zinc-800 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-yellow-400 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400/60" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-zinc-800 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Ainda não tem conta?{" "}
                <Link to="/register" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <Link to="/" className="text-yellow-400/60 hover:text-yellow-400 text-sm">
                ← Voltar ao início
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
