"use client";

import { User } from "@clerk/nextjs/server";
import { Shield, MoreVertical, Calendar } from "lucide-react";

interface UserTableProps {
	users: User[];
	currentPage: number;
	totalUsers: number;
	pageSize: number;
}

export const UserTable = ({ users }: UserTableProps) => {
	const roleColors = {
		admin: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
		moderator:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
		user: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
	};

	return (
		<div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-900">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								User
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Role
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Last Active
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Joined
							</th>
							<th className="relative px-6 py-3">
								<span className="sr-only">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
						{users.map((user) => {
							const primaryEmail = user.emailAddresses.find(
								(email) =>
									email.id === user.primaryEmailAddressId
							)?.emailAddress;
							const userRole: "admin" | "moderator" | "user" =
								(
									user.publicMetadata as {
										role?: "admin" | "user";
									}
								)?.role || "user";
							const lastSignIn = user.lastSignInAt
								? new Date(
										user.lastSignInAt
								  ).toLocaleDateString()
								: "Never";

							return (
								<tr
									key={user.id}
									className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											{user.imageUrl ? (
												<img
													className="h-10 w-10 rounded-full"
													src={user.imageUrl}
													alt={`${user.firstName} ${user.lastName}`}
												/>
											) : (
												<div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
													<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
														{user.firstName?.charAt(
															0
														)}
														{user.lastName?.charAt(
															0
														)}
													</span>
												</div>
											)}
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-900 dark:text-white">
													{user.firstName}{" "}
													{user.lastName}
												</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													ID: {user.id.slice(-8)}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900 dark:text-white">
											{primaryEmail}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[userRole]}`}
										>
											<Shield className="w-3 h-3 mr-1" />
											{userRole}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-500 dark:text-gray-400">
											{lastSignIn}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-500 dark:text-gray-400">
											{new Date(
												user.createdAt
											).toLocaleDateString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
											<MoreVertical className="h-5 w-5" />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
				<div className="text-sm text-gray-500 dark:text-gray-400">
					Showing {users.length} of {users.length} users
				</div>
				<div className="mt-2 flex justify-between items-center">
					<div className="text-sm text-gray-500 dark:text-gray-400">
						Page {1} of {Math.ceil(users.length / 10)}
					</div>
					<button className="text-blue-600 dark:text-blue-400 hover:underline">
						Load More
					</button>
				</div>
			</div>
		</div>
	);
};
