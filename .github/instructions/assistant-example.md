# 🤖 AI Development Assistant - Exemplo de Uso

Este arquivo demonstra como o AI Development Assistant deve abordar uma tarefa típica.

## 📋 Exemplo: Issue #42 - Implementar Sistema de Autenticação JWT

### 🔍 Etapa 1: Pesquisa Inicial

**Consulta à documentação:**
```bash
# Procurar por implementações existentes
semantic_search: "authentication jwt auth login"
grep_search: "auth" --include="*.ts" --include="*.tsx"
file_search: "**/auth/**"
read_file: "apps/api/src/auth/"
read_file: "packages/ui/src/components/login/"
```

**Achados da pesquisa:**
- ✅ Encontrado middleware de auth básico em `apps/api/src/middleware/auth.ts`
- ✅ Componente de login existente em `packages/ui/src/components/auth/`
- ✅ Tipos TypeScript para User em `packages/types/src/auth.ts`
- ✅ Configuração de JWT em variáveis de ambiente

### 🎯 Etapa 2: Plano de Implementação

**Recursos existentes para reutilizar:**
- Middleware de autenticação base
- Componentes de UI para login/signup
- Tipos TypeScript definidos
- Configuração de ambiente

**Abordagem:**
1. Estender middleware existente com validação JWT
2. Implementar serviços de auth no backend
3. Conectar componentes frontend com nova API
4. Adicionar testes abrangentes
5. Atualizar documentação

**Estimativa:** 4-6 horas
**Riscos:** Quebra de compatibilidade com auth atual

### 🔧 Etapa 3: Implementação

#### Backend - Extensão do Middleware
```typescript
// apps/api/src/middleware/auth.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req);
      if (token) {
        const payload = await this.jwtService.verifyAsync(token);
        req['user'] = payload;
      }
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

#### Frontend - Hook para Autenticação
```typescript
// packages/ui/src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { AuthService } from '../services/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      AuthService.validateToken(token)
        .then(setUser)
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { user, loading, login, logout };
}
```

### 🧪 Etapa 4: Testes

#### Testes Unitários
```typescript
// apps/api/src/middleware/__tests__/auth.test.ts
describe('AuthMiddleware', () => {
  it('should validate JWT token successfully', async () => {
    const middleware = new AuthMiddleware(jwtService);
    const req = mockRequest({ headers: { authorization: 'Bearer validtoken' } });
    
    await middleware.use(req, res, next);
    
    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for invalid token', async () => {
    const middleware = new AuthMiddleware(jwtService);
    const req = mockRequest({ headers: { authorization: 'Bearer invalidtoken' } });
    
    await expect(middleware.use(req, res, next)).rejects.toThrow(UnauthorizedException);
  });
});
```

#### Testes de Integração
```typescript
// apps/api/src/auth/__tests__/auth.integration.test.ts
describe('Auth Integration', () => {
  it('should login and access protected route', async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    const token = loginResponse.body.token;
    
    const protectedResponse = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(protectedResponse.status).toBe(200);
  });
});
```

### 📊 Etapa 5: Validação de Qualidade

```bash
# Executar todos os testes
pnpm test
✅ 42 tests passing (95% coverage)

# Verificar tipos
pnpm check-types
✅ No TypeScript errors

# Lint e formatação
pnpm lint
✅ No linting errors

# Build
pnpm build
✅ Build successful
```

### 📝 Etapa 6: Documentação

#### Atualização da API Docs
```markdown
## Authentication Endpoints

### POST /auth/login
Authenticates user and returns JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "role": "user"
  }
}
```
```

### ✅ Resultado Final

**Arquivos Modificados:**
- `apps/api/src/middleware/auth.ts` - Middleware JWT atualizado
- `apps/api/src/auth/auth.service.ts` - Serviço de autenticação
- `packages/ui/src/hooks/useAuth.ts` - Hook de autenticação
- `packages/ui/src/components/auth/LoginForm.tsx` - Formulário atualizado

**Testes Adicionados:**
- 15 testes unitários
- 8 testes de integração
- Coverage: 95%

**Documentação Atualizada:**
- API documentation
- Component Storybook
- README com exemplos de uso

### 💡 Melhorias Sugeridas

**Para implementação futura:**
1. **Rate Limiting**: Adicionar limite de tentativas de login
2. **Refresh Tokens**: Implementar renovação automática de tokens
3. **2FA**: Suporte para autenticação de dois fatores
4. **Audit Logs**: Registrar tentativas de acesso

**Performance:**
- Implementar cache de validação de tokens
- Lazy loading dos componentes de auth

### 🔄 Próximos Passos

1. **Code Review**: Solicitar revisão do PR
2. **Testing**: Executar testes em staging
3. **Security Review**: Validação de segurança
4. **Documentation**: Finalizar documentação de usuário
5. **Deploy**: Preparar para release

---

## 📋 Template de Comunicação

### Para Updates de Progresso:
```markdown
## 🔄 Update da Task #42

**Status**: 75% Completo
**Progresso**: Backend implementado, iniciando frontend
**Próximos Passos**: Integração dos componentes UI
**Bloqueios**: Nenhum
**ETA**: 2 horas para conclusão
```

### Para Conclusão:
```markdown
## ✅ Task #42 Finalizada

**Implementação**: Sistema JWT completo
**Testes**: 95% coverage, todos passando
**Documentação**: Atualizada
**Deploy**: Pronto para review

**Breaking Changes**: Nenhuma
**Migration**: Não necessária
```

Este exemplo demonstra a abordagem metódica, focada em qualidade e documentação que o AI Assistant deve sempre seguir.
