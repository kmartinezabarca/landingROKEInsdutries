import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { sileo as toast } from 'sileo';
import { useGoogleLogin } from '@react-oauth/google';
import authService from '../../../services/authService';
import { useAuthContext } from '../../../contexts/AuthContext';

const loginSchema = z.object({
  email:    z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

const registerSchema = z.object({
  first_name:            z.string().min(1, 'Nombre requerido'),
  last_name:             z.string().min(1, 'Apellido requerido'),
  username:              z.string().min(3, 'Mínimo 3 caracteres').regex(/^[a-z0-9_]+$/, 'Solo letras, números y _'),
  email:                 z.string().email('Email inválido'),
  password:              z.string().min(8, 'Mínimo 8 caracteres'),
  password_confirmation: z.string(),
}).refine(d => d.password === d.password_confirmation, {
  path: ['password_confirmation'],
  message: 'Las contraseñas no coinciden',
});

type LoginData    = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

interface Props { onSuccess: () => void; }

export const AuthStep: React.FC<Props> = ({ onSuccess }) => {
  const [tab, setTab]           = useState<'login' | 'register'>('login');
  const [showPass, setShowPass]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { setAuth }             = useAuthContext();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(r => r.json());

        const res  = await authService.loginWithGoogle(userInfo);
        const body = (res.data as any);
        const token = body.access_token;
        const user  = body.user;
        if (!token) throw new Error('Sin token');
        setAuth(token, user);
        toast.success(`¡Bienvenido, ${user.first_name}!`);
        onSuccess();
      } catch (err: any) {
        const msg = err?.response?.data?.message ?? 'Error al iniciar con Google';
        toast.error(msg);
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => toast.error('Error al iniciar con Google'),
  });

  const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const regForm   = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const handleLogin = loginForm.handleSubmit(async (data) => {
    try {
      const res = await authService.login(data);
      const body = (res.data as any);
      const token = body.access_token;
      const user  = body.user;
      if (!token) throw new Error('Sin token');
      setAuth(token, user);
      toast.success(`¡Bienvenido, ${user.first_name}!`);
      onSuccess();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Credenciales incorrectas';
      toast.error(msg);
    }
  });

  const handleRegister = regForm.handleSubmit(async (data) => {
    try {
      const res = await authService.register(data);
      const body = (res.data as any);
      const token = body.access_token;
      const user  = body.user;
      if (!token) throw new Error('Sin token');
      setAuth(token, user);
      toast.success('¡Cuenta creada! Continuando con tu compra…');
      onSuccess();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Error al crear la cuenta';
      toast.error(msg);
    }
  });

  return (
    <div className="space-y-6">
      {/* Tab switch */}
      <div className="flex bg-muted rounded-xl p-1 gap-1">
        {(['login', 'register'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        ))}
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => googleLogin()}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-sm font-medium transition disabled:opacity-60"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        Continuar con Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">o</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              {...loginForm.register('email')}
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            {loginForm.formState.errors.email && (
              <p className="text-xs text-red-500 mt-1">{loginForm.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Contraseña</label>
            <div className="relative">
              <input
                {...loginForm.register('password')}
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition pr-11"
              />
              <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-xs text-red-500 mt-1">{loginForm.formState.errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginForm.formState.isSubmitting}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loginForm.formState.isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Iniciar sesión
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Nombre</label>
              <input
                {...regForm.register('first_name')}
                placeholder="Juan"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
              {regForm.formState.errors.first_name && (
                <p className="text-xs text-red-500 mt-1">{regForm.formState.errors.first_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Apellido</label>
              <input
                {...regForm.register('last_name')}
                placeholder="García"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
              {regForm.formState.errors.last_name && (
                <p className="text-xs text-red-500 mt-1">{regForm.formState.errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Nombre de usuario</label>
            <input
              {...regForm.register('username')}
              placeholder="juan_garcia"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            {regForm.formState.errors.username && (
              <p className="text-xs text-red-500 mt-1">{regForm.formState.errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              {...regForm.register('email')}
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            {regForm.formState.errors.email && (
              <p className="text-xs text-red-500 mt-1">{regForm.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Contraseña</label>
            <div className="relative">
              <input
                {...regForm.register('password')}
                type={showPass ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition pr-11"
              />
              <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {regForm.formState.errors.password && (
              <p className="text-xs text-red-500 mt-1">{regForm.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Confirmar contraseña</label>
            <input
              {...regForm.register('password_confirmation')}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            {regForm.formState.errors.password_confirmation && (
              <p className="text-xs text-red-500 mt-1">{regForm.formState.errors.password_confirmation.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={regForm.formState.isSubmitting}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {regForm.formState.isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Crear cuenta y continuar
          </button>
        </form>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Al continuar aceptas nuestros{' '}
        <a href="/terms" target="_blank" className="underline hover:text-foreground">Términos de servicio</a>
        {' '}y{' '}
        <a href="/privacy" target="_blank" className="underline hover:text-foreground">Política de privacidad</a>.
      </p>
    </div>
  );
};
