import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
const qs = require('querystring');

@Injectable()
export class AiService {
    constructor(
        private readonly configService: ConfigService,
    ) { }
    async getSavingAdvice(goalName: string, target: number, current: number, dueDate: string): Promise<string> {
        const remaining = target - current;
        const daysLeft = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const daily = remaining > 0 && daysLeft > 0 ? (remaining / daysLeft).toFixed(2) : 0;

        const prompt = `
คุณเป็นผู้ช่วยวางแผนการเงิน:
เป้าหมาย: ${goalName}
เป้าหมายรวม: ${target} บาท
ปัจจุบันมี: ${current} บาท
ครบกำหนด: ${dueDate}
วันนี่คือวันที่: ${new Date().toISOString().split('T')[0]}
แนะนำการเก็บเงินอย่างเหมาะสมให้หน่อย เช่น ต่อวัน หรือสัปดาห์ 

แสดงคำตอบสั้นๆ และชัดเจน เช่น "คุณควรเก็บเงินวันละ xxx บาท" หรือ "คุณควรเก็บเงินสัปดาห์ละ xxx บาท" , "คุณเหลืออีก xxx บาท ภายใน x เดือน ควรเก็บเดือนละ xxx บาท"
`;

        const model = 'gpt-3.5-turbo';
        const apiUrl = `http://195.179.229.119/gpt/api.php?${qs.stringify({
            prompt: prompt,
            api_key: this.configService.get('AI_API_KEY'),
            model: model
        })}`;
        try {
            const response = await axios.get(apiUrl);
            // Print the response data
            console.log(response.data);
            if (response.data && typeof response.data === 'object' && response.data['content']) {
                return String(response.data['content']);
            }
            return String(response.data);
        } catch (error: any) {
            // Print any errors
            console.error('Request Error:', error.message);
            return 'เกิดข้อผิดพลาดในการขอข้อมูลจาก AI';
        }
    }
}
