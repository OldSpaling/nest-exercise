import { Global, Module } from "@nestjs/common";
import { LoggingPlugin } from "./plugins/logging.plugin";
import { DataScalar } from "./scalars/date.scalar";
import { PeopleScalar } from "./scalars/people.scalar";

@Global()
@Module({
    providers: [DataScalar, PeopleScalar, LoggingPlugin],
    exports: []
})
export class CommonModule{

}