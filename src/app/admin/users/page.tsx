"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-100 text-purple-700",
  ADMIN: "bg-blue-100 text-blue-700",
  EDITOR: "bg-slate-100 text-slate-700",
};

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "EDITOR" as User["role"],
    isActive: true,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setError("");

    if (!formData.email || !formData.name) {
      setError("Email and name are required");
      return;
    }

    if (!editingId && !formData.password) {
      setError("Password is required for new users");
      return;
    }

    try {
      const url = editingId ? `/api/admin/users/${editingId}` : "/api/admin/users";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        fetchUsers();
        resetForm();
      } else {
        setError(data.error || "Failed to save user");
      }
    } catch {
      setError("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
      } else {
        alert(data.error || "Failed to delete user");
      }
    } catch {
      alert("An error occurred");
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      email: user.email,
      name: user.name,
      password: "",
      role: user.role,
      isActive: user.isActive,
    });
    setShowNew(true);
    setError("");
  };

  const resetForm = () => {
    setEditingId(null);
    setShowNew(false);
    setFormData({
      email: "",
      name: "",
      password: "",
      role: "EDITOR",
      isActive: true,
    });
    setError("");
  };

  const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";

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
          <h1 className="text-3xl font-light text-slate-900">Users</h1>
          <p className="text-slate-500 mt-1">Manage admin users</p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={() => setShowNew(true)}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            + Add User
          </button>
        )}
      </div>

      {!isSuperAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            Only Super Admins can create, edit, or delete users.
          </p>
        </div>
      )}

      {/* New/Edit Form */}
      {showNew && isSuperAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-medium text-slate-900 mb-6">
            {editingId ? "Edit User" : "New User"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password {editingId ? "(leave blank to keep current)" : "*"}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as User["role"] })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-sm font-medium text-slate-700">Active</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              {editingId ? "Update" : "Create"} User
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">User</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Role</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Last Login</th>
              {isSuperAdmin && (
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      roleColors[user.role] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString()
                    : "Never"}
                </td>
                {isSuperAdmin && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        Edit
                      </button>
                      {user.id !== session?.user?.id && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
