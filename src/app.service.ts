import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <H1>Pharol api!</h1>
      <a href="/api">Api Documentation</a>
      `;
  }
}
