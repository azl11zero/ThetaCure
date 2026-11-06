'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Send,
  Mic,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Building2,
  FlaskConical,
  Star,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { processAiQuery } from '@/lib/ai/smartAssistant';
import { AiMessage } from '@/lib/ai/types';
import { useLanguage } from '@/components/LanguageContext';

export default function AiAssistantPage() {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome-page',
      sender: 'assistant',
      text: language === 'bn'
        ? 'আসসালামু আলাইকুম! আমি থিটাকিউর এআই স্বাস্থ্য সহকারী। আপনার উপসর্গ বলুন, বিশেষজ্ঞ ডাক্তার খুঁজুন অথবা পরীক্ষা ও হাসপাতালের তথ্য জানুন।'
        : 'Welcome to ThetaCure AI Health Navigation. Describe any symptoms you are experiencing, ask for doctor recommendations in Dhaka, or compare diagnostic test fees across hospitals.',
      timestamp: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'bn' ? 'bn-BD' : 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          handleSend(transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported on this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSend = (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: AiMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const response = processAiQuery(trimmed, language);
      setMessages((prev) => [...prev, response]);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">AI Health Assistant</span>
      </nav>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-card-subtle overflow-hidden flex flex-col h-[75vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">ThetaCure AI Healthcare Navigator</h1>
              <p className="text-xs text-gray-500">Live navigation assistant powered by verified clinical datasets</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
                ttsEnabled ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]' : 'border-gray-200 text-gray-600'
              }`}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{ttsEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#D91F2B] text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>

                {msg.richContent?.actions && (
                  <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    {msg.richContent.actions.map((act, i) => (
                      <Link
                        key={i}
                        href={act.href}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                          act.variant === 'primary'
                            ? 'bg-[#D91F2B] text-white hover:bg-[#C01823]'
                            : act.variant === 'emergency'
                            ? 'bg-red-700 text-white animate-pulse'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? 'Listening to speech...' : 'Type symptoms, doctor specialty, or test names...'}
                className="w-full pl-5 pr-12 py-3 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#D91F2B]"
              />
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                  isListening ? 'bg-red-600 text-white animate-pulse' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 py-3 bg-[#D91F2B] hover:bg-[#C01823] disabled:opacity-50 text-white text-xs font-semibold rounded-full shadow transition flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
