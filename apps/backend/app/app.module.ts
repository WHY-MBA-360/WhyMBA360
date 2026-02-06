import { Module } from "@nestjs/common";
import { ApeModule } from "./routes/ape.module";

@Module({
  imports: [
    ApeModule, // Adapter layer only – no engine internals
  ],
})
export class AppModule {}
