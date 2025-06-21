"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUser } from "@/api/user";
import { logout, getUserSession } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  Clock,
  MapPin,
  Settings,
  Shield,
  LogOut,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountClientPage() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const session = await getUserSession();
      if (!session?.userId) return null;
      return getUser(session.userId);
    },
  });

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            User not found
          </h2>
          <p className="text-gray-600">Please log in to access your account.</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">
            Manage your profile, orders, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Profile & Quick Actions */}
          <div className="space-y-6 lg:col-span-1">
            {/* Profile Card */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{user.username}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                  {user.isEmailConfirmed && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{user.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">
                    Member since {formatDate(user.createdAt)}
                  </span>
                </div>
                {/* <Button variant="outline" className="mt-4 w-full" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button> */}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/orders">
                  <Button
                    variant="ghost"
                    className="h-12 w-full justify-start"
                    size="lg"
                  >
                    <ShoppingBag className="mr-3 h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Orders</div>
                      <div className="text-sm text-gray-500">
                        View order history
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link href="/cart">
                  <Button
                    variant="ghost"
                    className="h-12 w-full justify-start"
                    size="lg"
                  >
                    <ShoppingBag className="mr-3 h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Cart</div>
                      <div className="text-sm text-gray-500">
                        Manage your cart
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link href="/likes">
                  <Button
                    variant="ghost"
                    className="h-12 w-full justify-start"
                    size="lg"
                  >
                    <Heart className="mr-3 h-5 w-5 text-red-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Likes</div>
                      <div className="text-sm text-gray-500">
                        Your saved items
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link href="/history">
                  <Button
                    variant="ghost"
                    className="h-12 w-full justify-start"
                    size="lg"
                  >
                    <Clock className="mr-3 h-5 w-5 text-purple-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">History</div>
                      <div className="text-sm text-gray-500">
                        Recently viewed
                      </div>
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Account Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Addresses */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Saved Addresses
                    </CardTitle>
                  </div>
                  {/* <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Manage
                  </Button> */}
                </div>
              </CardHeader>
              <CardContent>
                {user.addresses.length > 0 ? (
                  <div className="grid gap-4">
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {address.firstName} {address.lastName}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                              {address.address}
                            </p>
                            {address.apartment && (
                              <p className="text-sm text-gray-600">
                                Apt {address.apartment}
                              </p>
                            )}
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.governorate}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.country} {address.postalCode}
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {address.addressType}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                    <p className="mb-4 text-gray-500">No saved addresses yet</p>
                    <Button variant="outline" size="sm">
                      Add Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Account Settings
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Password</p>
                      <p className="text-sm text-gray-500">
                        Last changed 3 months ago
                      </p>
                    </div>
                  </div>
                  {/* <Button variant="outline" size="sm">
                    Change
                  </Button> */}
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Email Preferences
                      </p>
                      <p className="text-sm text-gray-500">
                        Manage notifications
                      </p>
                    </div>
                  </div>
                  {/* <Button variant="outline" size="sm">
                    Configure
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            {/* Logout Section */}
            <div className="border-t border-gray-200 pt-6">
              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                  queryClient.clear();
                }}
                className="h-12 w-full"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
