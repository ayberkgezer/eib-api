import axios from 'axios';
import { ChatResponseDto } from '../dto/respond/ai-chat.respond.dto';
export async function sendMessage(message: string): Promise<ChatResponseDto> {
  const apiUrl: string = process.env.AI_API_URL;
  const response: any = await axios.post(apiUrl, { message });
  return { response: response.data.response };
}
