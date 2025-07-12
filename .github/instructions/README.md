# 🤖 AI Development Assistant

## 📋 Overview

O **AI Development Assistant** é configurado para ser seu parceiro de desenvolvimento fullstack, seguindo as melhores práticas do projeto e sempre consultando a documentação antes de implementar qualquer funcionalidade.

## 🎯 Características Principais

### 🔍 **Documentation-First Approach**
- **Sempre pesquisa** documentação existente antes de implementar
- **Reutiliza** componentes e padrões estabelecidos
- **Evita** reinventar funcionalidades já existentes

### 🧪 **Test-Driven Development**
- **Testes obrigatórios** para toda nova funcionalidade
- **Coverage mínimo** de 90% para componentes críticos
- **Testes unitários, integração e E2E** quando aplicável

### 🏗️ **Architecture Compliance**
- **Segue** estrutura de pastas estabelecida
- **Mantém** consistência de código
- **Respeita** padrões de nomenclatura

## 🚀 Como Usar o Assistant

### 1. **Para Implementar uma Feature (Issue)**

Simplesmente mencione o número da Issue e descreva o que precisa:

```
Implementar a Issue #42 - Sistema de autenticação JWT
```

O assistant irá:
1. 🔍 Pesquisar documentação relevante
2. 📋 Criar plano de implementação
3. 💻 Desenvolver a funcionalidade
4. 🧪 Criar testes abrangentes
5. 📝 Atualizar documentação

### 2. **Para Corrigir Bugs**

```
Corrigir erro de validação no formulário de login - Issue #38
```

O assistant irá:
1. 🔍 Investigar o problema
2. 📚 Consultar documentação relacionada
3. 🛠️ Implementar correção
4. ✅ Adicionar testes para prevenir regressão

### 3. **Para Melhorias e Refatoração**

```
Otimizar performance do componente de lista de usuários
```

O assistant irá:
1. 📊 Analisar código atual
2. 🔍 Pesquisar padrões de otimização
3. ⚡ Implementar melhorias
4. 📈 Medir impacto na performance

## 💡 Exemplos Práticos

### ✨ **Implementação de Feature**

**Você:**
> Implementar sistema de notificações em tempo real usando WebSockets - Issue #67

**Assistant Response:**
```markdown
## 🔍 Research Findings

**Existing Resources Found:**
- WebSocket service base in `apps/api/src/websocket/`
- Notification components in `packages/ui/src/components/notifications/`
- Real-time hooks in `packages/ui/src/hooks/useWebSocket.ts`

**Implementation Plan:**
1. Extend existing WebSocket service
2. Create notification store with Zustand
3. Integrate with existing UI components
4. Add comprehensive tests
5. Update documentation

**Files to Modify:**
- `apps/api/src/websocket/notification.gateway.ts`
- `packages/ui/src/stores/notificationStore.ts`
- `packages/ui/src/hooks/useNotifications.ts`

**Testing Strategy:**
- Unit tests for gateway and store
- Integration tests for WebSocket connection
- E2E tests for notification flow

Proceeding with implementation...
```

### 🐛 **Correção de Bug**

**Você:**
> Bug no upload de arquivos - está retornando erro 500 - Issue #45

**Assistant Response:**
```markdown
## 🔍 Investigation Results

**Error Analysis:**
- Found error in `apps/api/src/upload/upload.service.ts` line 23
- Missing file size validation
- Buffer overflow when processing large files

**Root Cause:**
File validation middleware not properly configured for multipart uploads

**Fix Applied:**
1. Added proper file size limits
2. Implemented buffer management
3. Enhanced error handling
4. Added file type validation

**Prevention:**
- Added integration tests for file uploads
- Updated documentation with file limits
- Added monitoring for upload errors

All tests passing ✅
```

## 🎨 Padrões de Qualidade

### 📝 **Code Style**
```typescript
// ✅ GOOD - Seguindo padrões do projeto
interface UserProps {
  id: string;
  name: string;
  email: string;
}

export function UserCard({ id, name, email }: UserProps) {
  return (
    <Card className="user-card">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
```

### 🧪 **Testing Standards**
```typescript
// ✅ GOOD - Testes abrangentes
describe('UserCard', () => {
  it('should display user information', () => {
    render(<UserCard id="1" name="John" email="john@test.com" />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('should handle missing data gracefully', () => {
    render(<UserCard id="1" name="" email="" />);
    expect(screen.getByText('Unknown User')).toBeInTheDocument();
  });
});
```

## 🛠️ Ferramentas e Comandos

### 📚 **Research Commands**
```bash
# O assistant usa automaticamente:
semantic_search: "notification websocket real-time"
grep_search: "WebSocket" --include="*.ts"
file_search: "**/notification/**"
read_file: "docs/websocket-guide.md"
```

### ✅ **Quality Checks**
```bash
# Executados automaticamente:
pnpm lint
pnpm test
pnpm build
pnpm check-types
```

## 📊 Métricas de Sucesso

O assistant garante:
- ✅ **95%+ test coverage** para código crítico
- ✅ **Zero lint errors** 
- ✅ **TypeScript strict compliance**
- ✅ **Performance benchmarks** mantidos
- ✅ **Security best practices** seguidas

## 🚨 Suporte a Emergências

Para **hotfixes críticos**:

```
URGENTE: Sistema de pagamento com erro crítico - Issue #99
```

O assistant irá:
1. 🚨 Priorizar análise imediata
2. 🔍 Investigar causa raiz rapidamente
3. 🛠️ Implementar fix mínimo viável
4. ✅ Testar extensivamente
5. 📝 Documentar para pós-mortem

## 💬 Comunicação Efetiva

### ✅ **Como Pedir Ajuda**
```
# Claro e específico
"Implementar autenticação OAuth Google - Issue #42"
"Corrigir memory leak no componente DataTable"
"Otimizar query de usuários para melhor performance"
```

### ❌ **Evite Ser Vago**
```
# Muito vago
"Fazer o login funcionar"
"Arrumar o bug"
"Melhorar o sistema"
```

## 📈 Continuous Improvement

O assistant está sempre:
- 🔄 **Aprendendo** com patterns do projeto
- 📚 **Atualizando** conhecimento da documentação
- 🎯 **Sugerindo** melhorias proativas
- 🛡️ **Identificando** vulnerabilidades de segurança

---

## 🎯 Próximos Passos

1. **Experimente** pedir para implementar uma feature simples
2. **Observe** como o assistant pesquisa e planeja
3. **Aproveite** as sugestões de melhorias
4. **Colabore** no refinamento dos padrões

**Lembre-se**: O assistant é seu parceiro de desenvolvimento, não apenas um executor de tarefas. Ele vai questionar, sugerir e garantir qualidade em tudo que faz! 🚀
