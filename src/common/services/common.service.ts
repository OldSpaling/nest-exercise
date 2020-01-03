import { INestApplication } from "@nestjs/common";
export class CommonService {
    private static app: INestApplication;
    public static setApp(app: INestApplication) {
        CommonService.app = app;
    }
    public static getApp() {
        return CommonService.app;
    }
}