//* Style imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//* Hooks imports
import { useLogin } from "@/hooks/login/useLogin";
const MedicalLogin = () => {
  const { handleSubmit, formData, setFormData, loginError } = useLogin();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side */}
      <div className="hidden md:flex items-center justify-center p-8 bg-[#004976] text-white">
        <h1 className="text-4xl font-bold">Gestiona tus consultas</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#004976] text-center">
              Medical Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  className="w-full border-2 rounded-md"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  className="w-full border-2 rounded-md"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#004976] hover:bg-[#003557] text-white py-2 rounded-md"
              >
                Ingresar
              </Button>
              {loginError && (
                <p className="text-red-500 text-center mt-4">
                  Error al iniciar sesión. Por favor, verifica tus credenciales.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalLogin;
