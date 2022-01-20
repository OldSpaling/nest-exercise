import { ESLintUtils } from '@typescript-eslint/utils';
import rule from './service-controller-property-readonly';
const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser"
});
ruleTester.run("service-controller-property-readonly", rule, {
    valid: [
        {
            code: `
            export class TestService{
                private readonly test2:string;
                constructor(private readonly test1:string){}
                test4(testp:string){}
            }
            export class Test{
                readonly test2:string;
                constructor(private readonly test1:string){}   
            }
            `
        }
    ],
    invalid: [{
        code: `
        export class TestService {
            test2: string;
            constructor(private test1: string) { }
        }
        `,
        errors: [
            {
                messageId: "missing-property-readonly",
            },
            {
                messageId: "missing-param-property-readonly"
            }
        ],
        output: `
        export class TestService {
            readonly test2: string;
            constructor(private readonly test1: string) { }
        }
        `
    }]
})