import { Doctor, Hospital, DiagnosticTest } from '../types';

export type MessageSender = 'user' | 'assistant' | 'system';

export interface AiAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'emergency';
}

export interface AiMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  richContent?: {
    type: 'doctorCard' | 'hospitalCard' | 'testComparison' | 'mapCard' | 'emergencyBanner';
    doctor?: Doctor;
    hospital?: Hospital;
    test?: DiagnosticTest;
    hospitals?: Hospital[];
    actions?: AiAction[];
  };
}
