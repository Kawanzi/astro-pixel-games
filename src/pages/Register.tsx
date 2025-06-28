
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar registro com Supabase
    if (password !== confirmPassword) {
      alert("Senhas não coincidem!");
      return;
    }
    console.log("Register attempt:", { name, email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-800/80 border-yellow-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-yellow-500/10 rounded-full w-fit">
              <UserPlus className="h-8 w-8 text-yellow-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-yellow-400 tracking-wide">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Junte-se a nós e crie jogos incríveis com IA
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-yellow-400 font-medium">
                  Nome
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-yellow-400/60" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-zinc-800 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-yellow-400 font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-yellow-400/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-zinc-800 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    required
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
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-yellow-400 font-medium">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400/60" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-zinc-800 border-yellow-500/30 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
              >
                Criar Conta
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
                  Entre aqui
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

export default Register;
