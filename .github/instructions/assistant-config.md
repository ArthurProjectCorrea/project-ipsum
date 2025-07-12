# 🎯 AI Assistant Configuration

## 📋 Quick Commands for Development Tasks

### 🔍 Research Phase Commands
```bash
# Documentation search
semantic_search: "authentication jwt middleware"
grep_search: "export.*Auth" --include="*.ts"
file_search: "**/auth/**" 
file_search: "**/components/**"
file_search: "**/hooks/**"
read_file: "path/to/relevant/docs"

# Explore existing code patterns
list_code_usages: "AuthService"
test_search: ["src/auth/auth.service.ts"]
```

### 🧪 Quality Assurance Commands
```bash
# Before any commit
pnpm lint
pnpm test
pnpm build
pnpm check-types

# Error checking
get_errors: ["path/to/file.ts"]
```

### 📝 Git Workflow Commands
```bash
# Following the established workflow
git checkout develop
git pull origin develop
git checkout -b feat/42-jwt-authentication
# ... development work ...
git add .
pnpm commit  # Interactive commit with issue reference
git push origin feat/42-jwt-authentication
```

## 🎨 Code Templates

### React Component Template
```typescript
// packages/ui/src/components/feature/Component.tsx
import React from 'react';
import { cn } from '../../lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Component description
 * @param props - Component props
 */
export function Component({ className, children, ...props }: ComponentProps) {
  return (
    <div className={cn('base-styles', className)} {...props}>
      {children}
    </div>
  );
}

Component.displayName = 'Component';
```

### API Route Template (NestJS)
```typescript
// apps/api/src/feature/feature.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';

@ApiTags('feature')
@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feature' })
  async create(@Body() createFeatureDto: CreateFeatureDto) {
    try {
      return await this.featureService.create(createFeatureDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feature by ID' })
  async findOne(@Param('id') id: string) {
    return this.featureService.findOne(id);
  }
}
```

### Test Template
```typescript
// src/feature/__tests__/feature.test.ts
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Feature } from '../feature';

describe('Feature', () => {
  let feature: Feature;

  beforeEach(() => {
    feature = new Feature();
  });

  describe('method', () => {
    it('should handle success case', () => {
      const result = feature.method('validInput');
      expect(result).toBeDefined();
    });

    it('should handle error case', () => {
      expect(() => feature.method('')).toThrow();
    });

    it('should handle edge case', () => {
      const result = feature.method(null);
      expect(result).toBeNull();
    });
  });
});
```

### Hook Template
```typescript
// packages/ui/src/hooks/useFeature.ts
import { useState, useEffect, useCallback } from 'react';

interface UseFeatureOptions {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for feature functionality
 * @param options - Hook options
 */
export function useFeature(options: UseFeatureOptions = {}) {
  const { enabled = true, onSuccess, onError } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchData();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [enabled, onSuccess, onError]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
```

## 📚 Documentation Templates

### Component Documentation
```markdown
# Component Name

## Overview
Brief description of what the component does.

## Usage
```tsx
import { Component } from '@/components/component';

<Component prop="value">
  Content
</Component>
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop | string | - | Description |

## Examples
### Basic Usage
### Advanced Usage
### With Custom Styling
```

### API Documentation
```markdown
# API Endpoint

## `POST /api/endpoint`

### Description
What this endpoint does.

### Request Body
```json
{
  "field": "value"
}
```

### Response
```json
{
  "success": true,
  "data": {}
}
```

### Error Responses
- `400` - Bad Request
- `401` - Unauthorized
- `500` - Internal Server Error
```

## 🚨 Emergency Response Templates

### Hotfix Issue Template
```markdown
## 🔥 CRITICAL ISSUE

**Impact**: Production down / Security vulnerability / Data loss
**Affected Users**: [Number/All]
**Detected**: [Timestamp]
**Reporter**: [Name]

### Immediate Actions Taken
- [ ] Issue isolated
- [ ] Stakeholders notified
- [ ] Rollback considered

### Root Cause
[Analysis]

### Fix Applied
[Description]

### Prevention
[How to avoid this in future]
```

### Error Investigation Template
```markdown
## 🔍 Error Investigation

**Error**: [Error message]
**File**: [File path]
**Line**: [Line number]
**Context**: [What user was doing]

### Research Steps
1. Check similar issues in codebase
2. Review recent changes
3. Check logs and monitoring
4. Reproduce locally

### Solution
[Fix implemented]

### Testing
[How fix was validated]
```

## 🎯 Performance Optimization Checklist

### Frontend
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Lazy loading for components
- [ ] Bundle size analysis
- [ ] Performance metrics measured

### Backend
- [ ] Database queries optimized
- [ ] Caching strategy implemented
- [ ] API response times measured
- [ ] Memory usage monitored
- [ ] Rate limiting configured

## 🔐 Security Checklist

### Input Validation
- [ ] All user inputs validated
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens implemented

### Authentication
- [ ] Secure password hashing
- [ ] JWT token expiration
- [ ] Rate limiting on auth endpoints
- [ ] Secure session management

### Data Protection
- [ ] Sensitive data encrypted
- [ ] Environment variables secured
- [ ] API keys rotation
- [ ] Audit logs implemented

---

## 💬 Communication Templates

### Progress Update
```markdown
## 📊 Weekly Progress Report

**Completed This Week**:
- [x] Feature A implementation
- [x] Bug fixes in module B
- [x] Tests coverage improved to 95%

**In Progress**:
- [ ] Feature C (75% complete)
- [ ] Documentation updates

**Blocked**:
- Feature D (waiting for API spec)

**Next Week**:
- Complete Feature C
- Start Feature E
- Performance optimization
```

### Code Review Request
```markdown
## 👀 Code Review Request

**PR**: #123 - Implement JWT Authentication
**Reviewer**: @senior-dev
**Priority**: High
**Estimated Review Time**: 30 minutes

**Focus Areas**:
- Security implementation
- Error handling
- Test coverage
- Performance impact

**Context**:
Brief description of changes and why they were made.
```
