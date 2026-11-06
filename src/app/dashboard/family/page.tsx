'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Plus, Trash2, Heart, ChevronRight, User } from 'lucide-react';
import { FAMILY_MEMBERS } from '@/lib/data';
import { FamilyMember } from '@/lib/types';

export default function FamilyDashboardPage() {
  const [members, setMembers] = useState<FamilyMember[]>(FAMILY_MEMBERS);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Child');
  const [bloodGroup, setBloodGroup] = useState('O+');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newMember: FamilyMember = {
      id: 'fam-' + Date.now(),
      name,
      relationship,
      age: 12,
      gender: 'Child',
      bloodGroup,
    };
    setMembers([...members, newMember]);
    setName('');
    setShowAdd(false);
  };

  const handleRemove = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/dashboard" className="hover:text-gray-600 transition">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Family Profiles</span>
      </nav>

      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Family Health Profiles</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage dependents, children, and elderly family members under your ThetaCure care plan.</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-[#D91F2B] hover:bg-[#C01823] text-white rounded-full text-xs font-semibold shadow flex items-center gap-1.5 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Dependent</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Add New Family Member</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aayan Rahman"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
              >
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full shadow"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle flex items-start justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center font-bold text-sm">
                {member.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                <p className="text-xs text-gray-500">{member.relationship} • {member.age} yrs</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  Blood Group: {member.bloodGroup}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleRemove(member.id)}
              className="text-gray-400 hover:text-red-600 p-1 rounded-lg transition"
              title="Remove Profile"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
