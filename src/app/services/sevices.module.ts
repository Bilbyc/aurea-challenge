import { Module } from "@nestjs/common";
import { CreateAitService } from "./ait/create-ait.service";
import { RepositoriesModule } from "../infrastructure/repositories/repositories.module";

@Module({
    imports: [RepositoriesModule],
    providers: [CreateAitService],
    exports: [CreateAitService]
})

export class ServicesModule {}