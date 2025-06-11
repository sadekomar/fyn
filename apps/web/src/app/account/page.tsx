"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUser } from "@/api/user";
import { logout, getSessionAction } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export default function AccountPage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const session = await getSessionAction();
      if (!session?.userId) return null;
      return getUser(session.userId);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto space-y-6 py-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <h3 className="font-medium">Name</h3>
              <p className="text-gray-600">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Username</h3>
              <p className="text-gray-600">{user.username}</p>
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-gray-600">
                {user.email}{" "}
                {user.isEmailConfirmed ? "(Confirmed)" : "(Not Confirmed)"}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Phone Number</h3>
              <p className="text-gray-600">{user.phoneNumber}</p>
            </div>
            <div>
              <h3 className="font-medium">Account Created</h3>
              <p className="text-gray-600">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Addresses */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.addresses.map((address) => (
              <div key={address.id} className="rounded-lg border p-4">
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-gray-600">{address.address}</p>
                {address.apartment && (
                  <p className="text-gray-600">Apt {address.apartment}</p>
                )}
                <p className="text-gray-600">
                  {address.city}, {address.governorate}
                </p>
                <p className="text-gray-600">
                  {address.country} {address.postalCode}
                </p>
                <p className="text-sm text-gray-500">
                  Type: {address.addressType}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.orders.map((order) => (
              <div key={order.id} className="rounded-lg border p-4">
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-gray-600">Total: ${order.orderTotal}</p>
                <p className="text-gray-600">Status: {order.status}</p>
                <p className="text-gray-600">
                  Date: {formatDate(order.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cart Items */}
      <Card>
        <CardHeader>
          <CardTitle>Cart Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.itemCarts.map((item) => (
              <div key={item.id} className="rounded-lg border p-4">
                <p className="font-medium">Item ID: {item.itemId}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Size ID: {item.sizeId}</p>
                {item.colorId && (
                  <p className="text-gray-600">Color ID: {item.colorId}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 font-medium">Item Views</h3>
            <div className="space-y-2">
              {user.itemViews.map((view) => (
                <div key={view.id} className="text-sm text-gray-600">
                  Item {view.itemId}: {view.quantity} views
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Category Views</h3>
            <div className="space-y-2">
              {user.categoryViews.map((view) => (
                <div key={view.id} className="text-sm text-gray-600">
                  Category {view.categoryId}: {view.quantity} views
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Brand Views</h3>
            <div className="space-y-2">
              {user.brandViews.map((view) => (
                <div key={view.id} className="text-sm text-gray-600">
                  Brand {view.brandId}: {view.quantity} views
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Liked Items</h3>
            <div className="space-y-2">
              {user.likes.map((like) => (
                <div key={like.id} className="text-sm text-gray-600">
                  Item {like.itemId}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={() => logout()} className="w-full">
        Logout
      </Button>
    </div>
  );
}
