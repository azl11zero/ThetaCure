'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ArrowRight,
  Maximize2,
  Minimize2,
  RefreshCw,
  PhoneCall,
  Calendar,
  Building2,
  FlaskConical,
  Star,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { processAiQuery } from '@/lib/ai/smartAssistant';
import { AiMessage } from '@/lib/ai/types';
import { useLanguage } from './LanguageContext';

export default function AiAssistantDrawer() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: language === 'bn'
        ? 'আসসালামু আলাইকুম! আমি থিটাকিউর এআই সহকারী। ডাক্তার খোঁজা, টেস্টের খরচ যাচাই করা বা নিকটস্থ হাসপাতালের ম্যাপ দেখতে আমি কীভাবে সাহায্য করতে পারি?'
        : 'Hello! I am your ThetaCure AI Health-Navigation Assistant. How can I help you discover trusted specialists, compare diagnostic prices, or find emergency hospitals today?',
      timestamp: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Initialize Speech Recognition if supported
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

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#]/g, ''));
      utterance.lang = language === 'bn' ? 'bn-BD' : 'en-US';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (userText: string = input) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const userMsg: AiMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate intelligent AI response
    setTimeout(() => {
      const response = processAiQuery(trimmed, language);
      setMessages((prev) => [...prev, response]);

      if (ttsEnabled) {
        speakText(response.text);
      }
    }, 400);
  };

  const promptSuggestions = language === 'bn'
    ? [
        'বুকে ব্যথা ও অস্বস্তি হচ্ছে',
        'হাঁটু ও কোমরে প্রচণ্ড ব্যথা',
        'পেটে জ্বালাপোড়া ও এসিডিটি',
        'বাচ্চার জ্বর ও কাশি হচ্ছে',
        'মাথা ব্যথা ও মাইগ্রেন সমস্যা',
        'সিবিসি টেস্টের খরচ কত?'
      ]
    : [
        'Severe chest pain and tightness',
        'Knee joint and lower back pain',
        'Burning stomach ache and acid reflux',
        'Child has high fever and cough',
        'Migraine headache and dizziness',
        'Compare CBC test prices'
      ];

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-[#D91F2B] hover:bg-[#C01823] active:scale-95 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_4px_20px_rgba(217,31,43,0.35)] hover:shadow-[0_6px_25px_rgba(217,31,43,0.45)] flex items-center gap-2.5 transition-all duration-200 group"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#D91F2B]" />
        </div>
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          {language === 'bn' ? 'এআই স্বাস্থ্য সহকারী' : 'AI Health Assistant'}
        </span>
      </button>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full sm:max-w-lg h-[92vh] sm:h-[85vh] sm:mr-6 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
            {/* Drawer Header */}
            <div className="bg-white border-b border-gray-100 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-1.5">
                    <span>ThetaCure AI Navigator</span>
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Live
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Doctor matching, test prices & emergency navigation</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-400">
                <button
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={`p-2 rounded-lg hover:bg-gray-100 transition ${ttsEnabled ? 'text-[#D91F2B]' : 'text-gray-400'}`}
                  title={ttsEnabled ? 'Mute voice readouts' : 'Enable voice readouts'}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <Link
                  href="/ai-assistant"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition hover:text-gray-700"
                  title="Expand to Full Page"
                >
                  <Maximize2 className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition hover:text-gray-700"
                  title="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#D91F2B] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-200/80 shadow-sm rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Rich Content: Doctor Card */}
                    {msg.richContent?.type === 'doctorCard' && msg.richContent.doctor && (
                      <div className="mt-3 bg-gray-50 rounded-xl p-3 border border-gray-200 text-gray-800 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            <Image
                              src={msg.richContent.doctor.avatar}
                              alt={msg.richContent.doctor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-gray-900">{msg.richContent.doctor.name}</h5>
                            <p className="text-[11px] text-[#D91F2B] font-semibold">{msg.richContent.doctor.specialty}</p>
                            <p className="text-[10px] text-gray-500">{msg.richContent.doctor.hospital.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-200">
                          <span>Fee: <strong>৳{msg.richContent.doctor.fees.inPerson}</strong></span>
                          <span className="text-emerald-700 font-medium">Slot: {msg.richContent.doctor.nextAvailableSlot.formatted}</span>
                        </div>
                      </div>
                    )}

                    {/* Rich Content: Test Comparison */}
                    {msg.richContent?.type === 'testComparison' && msg.richContent.test && (
                      <div className="mt-3 bg-gray-50 rounded-xl p-3 border border-gray-200 text-gray-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{msg.richContent.test.name}</span>
                          <span className="text-[10px] bg-red-50 text-[#D91F2B] px-2 py-0.5 rounded font-bold">Lab Test</span>
                        </div>
                        <div className="space-y-1 text-[11px]">
                          {msg.richContent.test.providers.slice(0, 2).map((p, i) => (
                            <div key={i} className="flex justify-between py-0.5 border-b border-gray-100 last:border-0">
                              <span className="text-gray-600">{p.hospitalName}:</span>
                              <strong className="text-gray-900">৳{p.price}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rich Content: Action Buttons */}
                    {msg.richContent?.actions && (
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                        {msg.richContent.actions.map((act, i) => (
                          <Link
                            key={i}
                            href={act.href}
                            onClick={() => setIsOpen(false)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1 ${
                              act.variant === 'primary'
                                ? 'bg-[#D91F2B] text-white hover:bg-[#C01823] shadow-sm'
                                : act.variant === 'emergency'
                                ? 'bg-red-700 text-white hover:bg-red-800 shadow-sm animate-pulse'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3" />
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

            {/* Quick Suggestions Pills */}
            <div className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {promptSuggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-3 py-1 text-[11px] font-medium bg-gray-50 hover:bg-red-50 hover:text-[#D91F2B] border border-gray-200 rounded-full whitespace-nowrap transition"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      isListening
                        ? (language === 'bn' ? 'শুনছি... কথা বলুন' : 'Listening... Speak now')
                        : (language === 'bn' ? 'প্রশ্ন লিখুন বা বলুন...' : 'Ask symptoms, doctors, or tests...')
                    }
                    className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#D91F2B] rounded-full"
                  />

                  {/* Mic Voice STT Button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition ${
                      isListening
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                    title="Speak using voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 bg-[#D91F2B] hover:bg-[#C01823] disabled:opacity-50 text-white rounded-full transition shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
