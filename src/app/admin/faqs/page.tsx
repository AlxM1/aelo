"use client";

import { useState, useEffect } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
}

const categories = [
  { value: "ingredients", label: "Ingredients & Nutrition" },
  { value: "dietary", label: "Dietary Requirements" },
  { value: "products", label: "Products & Purchasing" },
  { value: "partnerships", label: "Partnerships" },
];

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "ingredients",
    sortOrder: 0,
    isPublished: true,
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success) {
        setFaqs(data.data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editingId ? `/api/admin/faqs/${editingId}` : "/api/admin/faqs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        fetchFAQs();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchFAQs();
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sortOrder: faq.sortOrder,
      isPublished: faq.isPublished,
    });
    setShowNew(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setShowNew(false);
    setFormData({
      question: "",
      answer: "",
      category: "ingredients",
      sortOrder: 0,
      isPublished: true,
    });
  };

  const groupedFAQs = categories.map((cat) => ({
    ...cat,
    faqs: faqs.filter((faq) => faq.category === cat.value),
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900">FAQs</h1>
          <p className="text-slate-500 mt-1">Manage frequently asked questions</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          + Add FAQ
        </button>
      </div>

      {/* New/Edit Form */}
      {showNew && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-medium text-slate-900 mb-6">
            {editingId ? "Edit FAQ" : "New FAQ"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">Published</span>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                {editingId ? "Update" : "Create"} FAQ
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ List by Category */}
      <div className="space-y-8">
        {groupedFAQs.map((group) => (
          <div key={group.value} className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="font-medium text-slate-900">{group.label}</h3>
              <p className="text-sm text-slate-500">{group.faqs.length} questions</p>
            </div>
            {group.faqs.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {group.faqs.map((faq) => (
                  <div key={faq.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-slate-900">{faq.question}</p>
                          {!faq.isPublished && (
                            <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded">
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="text-sm text-slate-600 hover:text-slate-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500">
                No FAQs in this category
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
