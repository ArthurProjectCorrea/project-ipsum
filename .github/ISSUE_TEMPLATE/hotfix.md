---
name: 🔥 Hotfix
about: Correção urgente que precisa ir direto para produção
title: '[HOTFIX] '
labels: ['hotfix', 'critical']
assignees: ''
---

## 🚨 Urgência
<!-- Por que isso é um hotfix? -->
- [ ] Falha crítica em produção
- [ ] Vulnerabilidade de segurança
- [ ] Perda de dados
- [ ] Indisponibilidade do serviço
- [ ] Bug bloqueante para usuários

## 🐛 Descrição do Problema
<!-- Descrição detalhada do problema crítico -->

## 💥 Impacto Atual
<!-- Qual o impacto em produção? -->
- **Usuários Afetados**: 
- **Funcionalidades Comprometidas**: 
- **Downtime**: 
- **Perda de Receita**: 

## 🔧 Solução Proposta
<!-- Como vai ser corrigido? -->

## 🧪 Plano de Teste
<!-- Como garantir que a correção funciona? -->
- [ ] Teste local
- [ ] Teste em staging
- [ ] Validação em produção
- [ ] Rollback plan definido

## 📋 Checklist de Deploy
- [ ] Código revisado por outro developer
- [ ] Testes passando
- [ ] Aprovação do tech lead
- [ ] Plano de rollback preparado
- [ ] Monitoramento configurado
- [ ] Comunicação para stakeholders

## 🔄 Processo de Merge
1. **Criar branch**: `hotfix/<issue-number>-<description>`
2. **Base branch**: `main`
3. **Target branch**: `main`
4. **Após merge em main**: Cherry-pick para `develop`

## 👥 Pessoas para Notificar
<!-- @ mencione pessoas relevantes -->
- Tech Lead: 
- Product Manager: 
- DevOps: 

## 📝 Observações
<!-- Informações adicionais importantes -->
