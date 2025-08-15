"use client";

import { useState } from "react";
import { User } from "@clerk/nextjs/server";
import {
	Mail,
	Calendar,
	Shield,
	User as UserIcon,
	MoreVertical,
	Edit,
	Trash2,
	Ban,
} from "lucide-react";

interface UserCardProps {
	user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
	const [showDropdown, setShowDropdown] = useState(false);

	const primaryEmail = user.emailAddresses.find(
		(email) => email.id === user.primaryEmailAddressId
	)?.emailAddress;

	const userRole = (user.publicMetadata as any)?.role || "user";
	const lastSignIn = user.lastSignInAt
		? new Date(user.lastSignInAt).toLocaleDateString()
		: "Never";

	const roleColors = {
		admin: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
		moderator:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
		user: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex items-center space-x-3">
					{user.imageUrl ? (
						<img
							src={user.imageUrl}
							alt={`${user.firstName} ${user.lastName}`}
							className="h-12 w-12 rounded-full object-cover"
						/>
					) : (
						<div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
							<UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
						</div>
					)}
					<div className="flex-1 min-w-0">
						<h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
							{user.firstName} {user.lastName}
						</h3>
						<span
							className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
								roleColors[userRole as keyof typeof roleColors]
							}`}
						>
							<Shield className="w-3 h-3 mr-1" />
							{userRole}
						</span>
					</div>
				</div>

				{/* Actions Dropdown */}
				<div className="relative">
					<button
						onClick={() => setShowDropdown(!showDropdown)}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
					>
						<MoreVertical className="h-4 w-4 text-gray-500" />
					</button>

					{showDropdown && (
						<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
							<div className="py-1">
								<button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
									<Edit className="h-4 w-4 mr-2" />
									Edit User
								</button>
								<button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
									<Ban className="h-4 w-4 mr-2" />
									Suspend User
								</button>
								<button className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
									<Trash2 className="h-4 w-4 mr-2" />
									Delete User
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* User Details */}
			<div className="mt-4 space-y-3">
				<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
					<Mail className="h-4 w-4 mr-2" />
					<span className="truncate">{primaryEmail}</span>
				</div>

				<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
					<Calendar className="h-4 w-4 mr-2" />
					<span>Last active: {lastSignIn}</span>
				</div>

				<div className="text-xs text-gray-500 dark:text-gray-500">
					Joined {new Date(user.createdAt).toLocaleDateString()}
				</div>
			</div>

			{/* Actions */}
			<div className="mt-6 flex space-x-2">
				<button className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
					View Profile
				</button>
				<button className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
					Send Message
				</button>
			</div>
		</div>
	);
};
