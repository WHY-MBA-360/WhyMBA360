import { Module } from "@nestjs/common";
import { ApeModule } from "./routes/ape.module";

@Module({
  imports: [ApeModule],
})
export class AppModule {}
