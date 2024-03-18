import { Controller, Get } from '@nestjs/common';

@Controller()
export class DbDailyActivity {
  constructor() {}

  @Get('/setenvs')
  setEnvVariables() {
    console.log('Heroku current envs:', process.env.DATABASE_URL);
    console.log('username=>', process.env.username);
    console.log('password=>', process.env.password);
    console.log('hostname=>', process.env.host);
    console.log('database=>', process.env.db);
    let url = this.parseDatabaseUrl(process.env.DATABASE_URL);
    if (process.env.username != url.username) {
      process.env.username = url.username;
    }
    if (process.env.password != url.password) {
      process.env.password = url.password;
    }
    if (process.env.host != url.host) {
      process.env.host = url.host;
    }
    if (process.env.db != url.database) {
      process.env.db = url.database;
    }
    return 'Success';
  }

  parseDatabaseUrl(databaseUrl: string) {
    var url = databaseUrl.split(':');
    var userName = url[1].substring(2);
    var password = url[2].split('@')[0];
    var host = url[2].split('@')[1];
    var database = url[3].split('/')[1];
    return {
      username: userName,
      password: password,
      host: host,
      database: database,
    };
  }
}
