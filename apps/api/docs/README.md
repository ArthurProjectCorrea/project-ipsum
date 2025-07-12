# 🚀 API Documentation

## 📋 Overview
NestJS backend API for the monorepo template.

## 🏗️ Architecture
- **Framework**: NestJS with TypeScript
- **Architecture**: Modular, controller-service pattern
- **Testing**: Jest for unit tests, Supertest for E2E
- **Validation**: class-validator and class-transformer

## 📁 Project Structure
```
apps/api/
├── src/                   # Source code
│   ├── app.controller.ts  # Main app controller
│   ├── app.service.ts     # Main app service
│   ├── app.module.ts      # Root module
│   └── main.ts           # Application entry point
├── test/                 # E2E tests
├── docs/                 # Project documentation
├── nest-cli.json         # NestJS CLI configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── tsconfig.build.json   # Build TypeScript configuration
```

## 🚀 Development

### Getting Started
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# E2E tests
pnpm test:e2e

# Lint code
pnpm lint
```

### Available Scripts
- `dev` - Start development server with hot reload
- `build` - Build production application
- `start` - Start production server
- `test` - Run unit tests
- `test:e2e` - Run end-to-end tests
- `test:cov` - Run tests with coverage
- `lint` - Run ESLint

## 🏭 Modules and Structure

### Creating a New Module
```bash
# Generate module with controller and service
nest g module users
nest g controller users
nest g service users
```

### Module Structure Example
```typescript
// users.module.ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### Controller Pattern
```typescript
// users.controller.ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
```

### Service Pattern
```typescript
// users.service.ts
@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    // Implementation
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Implementation
  }
}
```

## 🔧 Configuration

### Environment Variables
```env
# .env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-jwt-secret
```

### Configuration Module
```typescript
// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
```

## 🗃️ Database Integration

### TypeORM Setup
```typescript
// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
  ],
})
export class AppModule {}
```

### Entity Example
```typescript
// entities/user.entity.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

## 🔒 Authentication & Authorization

### JWT Strategy
```typescript
// auth/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

### Guards
```typescript
// auth/auth.guard.ts
@Injectable()
export class AuthGuard extends AuthGuard('jwt') {}
```

### Usage in Controllers
```typescript
@Controller('protected')
@UseGuards(AuthGuard)
export class ProtectedController {
  @Get()
  getProtectedData(@Request() req) {
    return req.user;
  }
}
```

## 🔍 Validation

### DTOs with Validation
```typescript
// dto/create-user.dto.ts
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

### Global Validation Pipe
```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

## 🔧 Middleware & Interceptors

### Custom Middleware
```typescript
// middleware/logger.middleware.ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}
```

### Response Interceptor
```typescript
// interceptors/transform.interceptor.ts
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

## 🧪 Testing

### Unit Tests
```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### E2E Tests
```typescript
// test/users.e2e-spec.ts
describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });
});
```

## 📊 Performance & Monitoring

### Health Checks
```typescript
// health/health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
```

### Request Timeouts
```typescript
// main.ts
app.use(timeout('30s'));
```

## 🚀 Deployment

### Production Build
```bash
pnpm build
pnpm start:prod
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/main"]
```

## 📚 Best Practices

### Error Handling
```typescript
// filters/http-exception.filter.ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
```

### Logging
```typescript
// Use built-in Logger
private readonly logger = new Logger(UsersService.name);

this.logger.log('User created successfully');
this.logger.error('Failed to create user', error.stack);
```

## 🐛 Troubleshooting

### Common Issues
1. **Module Resolution**: Check import paths and module exports
2. **Dependency Injection**: Ensure providers are properly registered
3. **Database Connections**: Verify connection strings and credentials

### Debug Mode
```bash
# Run with debug output
pnpm start:debug
```

## 📞 Support
For issues specific to the API, create an issue with the `backend` or `api` label.
