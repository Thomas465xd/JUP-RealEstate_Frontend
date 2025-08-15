// Client component for managing modal states
"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { SearchUsers } from "@/components/admin/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/src/utils/roles";
import { SetStateAction, useState } from "react";
import {
	Users,
	Mail,
	Shield,
	Calendar,
	Search,
	Filter,
	MoreVertical,
	Edit,
	Trash2,
	Eye,
	X,
	Save,
	UserPlus,
	AlertTriangle,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function UsersList({ 
	users, 
	query, 
	totalUsers, 
	onUpdateUser, 
	onDeleteUser 
}: {
	users: User[];
	query: string | undefined;
	totalUsers: number;
	onUpdateUser: (userId: string, updates: Partial<User>) => Promise<void>;
	onDeleteUser: (userId: string) => Promise<void>;
}) {
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [deletingUser, setDeletingUser] = useState<User | null>(null);
	const [viewingUser, setViewingUser] = useState<User | null>(null);

	if (!query) {
		return (
			<Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
				<CardContent className="flex flex-col items-center justify-center py-12 text-center">
					<Search className="h-12 w-12 text-zinc-600 dark:text-zinc-400 mb-4" />
					<h3 className="text-lg font-medium mb-2 text-zinc-900 dark:text-zinc-100">
						Ready to search
					</h3>
					<p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
						Use the search bar above to find users by name, email, or other criteria.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
						<Users className="h-5 w-5" />
						Search Results
						{totalUsers > 0 && (
							<Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
								{totalUsers}
							</Badge>
						)}
					</CardTitle>
					<CardDescription className="text-zinc-600 dark:text-zinc-400">
						{totalUsers === 0
							? `No users found matching "${query}"`
							: `Found ${totalUsers} user${
									totalUsers === 1 ? "" : "s"
							  } matching "${query}"`}
					</CardDescription>
				</CardHeader>
				<CardContent className="p-0">
					{users.length > 0 ? (
						<div className="divide-y divide-zinc-200 dark:divide-zinc-800">
							{users.map((user) => {
								const primaryEmail =
									user.emailAddresses.find(
										(email) =>
											email.id ===
											user.primaryEmailAddressId
									)?.emailAddress;

								const fullName =
									[user.firstName, user.lastName]
										.filter(Boolean)
										.join(" ") || "Unnamed User";

								const role =
									(user.publicMetadata
										.role as string) || "user";

								return (
									<div
										key={user.id}
										className="flex items-center justify-between p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
									>
										<div className="flex items-center space-x-4">
											<Avatar className="h-10 w-10">
												<AvatarImage
													src={user.imageUrl}
													alt={fullName}
												/>
												<AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium">
													{getUserInitials(
														user.firstName,
														user.lastName
													)}
												</AvatarFallback>
											</Avatar>

											<div className="space-y-1">
												<div className="flex items-center gap-2">
													<h3 className="font-medium leading-none text-zinc-900 dark:text-zinc-100">
														{fullName}
													</h3>
													<Badge
														variant={getRoleVariant(
															role
														)}
														className="text-xs"
													>
														{role
															.charAt(0)
															.toUpperCase() +
															role.slice(
																1
															)}
													</Badge>
												</div>

												<div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
													{primaryEmail && (
														<div className="flex items-center gap-1">
															<Mail className="h-3 w-3" />
															<span className="max-w-[200px] truncate">
																{
																	primaryEmail
																}
															</span>
														</div>
													)}
													<div className="flex items-center gap-1">
														<Calendar className="h-3 w-3" />
														<span>
															Joined{" "}
															{formatDate(
																user.createdAt
															)}
														</span>
													</div>
													{user.lastSignInAt && (
														<div className="hidden sm:flex items-center gap-1">
															<span>
																Last
																seen{" "}
																{formatLastSeen(
																	user.lastSignInAt
																)}
															</span>
														</div>
													)}
												</div>
											</div>
										</div>

										<DropdownMenu>
											<DropdownMenuTrigger
												asChild
											>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
												>
													<span className="sr-only">
														Open menu
													</span>
													<MoreVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												align="end"
												className="w-[160px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
											>
												<DropdownMenuLabel className="text-zinc-900 dark:text-zinc-100">
													Actions
												</DropdownMenuLabel>
												<DropdownMenuItem 
													onClick={() => setViewingUser(user)}
													className="text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
												>
													<Eye className="mr-2 h-4 w-4" />
													View Details
												</DropdownMenuItem>
												<DropdownMenuItem 
													onClick={() => setEditingUser(user)}
													className="text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
												>
													<Edit className="mr-2 h-4 w-4" />
													Edit User
												</DropdownMenuItem>
												<DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
												<DropdownMenuItem 
													onClick={() => setDeletingUser(user)}
													className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
												>
													<Trash2 className="mr-2 h-4 w-4" />
													Delete User
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								);
							})}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-12 text-center">
							<Search className="h-12 w-12 text-zinc-600 dark:text-zinc-400 mb-4" />
							<h3 className="text-lg font-medium mb-2 text-zinc-900 dark:text-zinc-100">
								No users found
							</h3>
							<p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
								Try adjusting your search terms or check for typos.
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Modals */}
			<EditUserModal
				user={editingUser}
				isOpen={!!editingUser}
				onClose={() => setEditingUser(null)}
				onSave={onUpdateUser}
			/>
			
			<DeleteUserModal
				user={deletingUser}
				isOpen={!!deletingUser}
				onClose={() => setDeletingUser(null)}
				onConfirm={onDeleteUser}
			/>
			
			<UserDetailsModal
				user={viewingUser}
				isOpen={!!viewingUser}
				onClose={() => setViewingUser(null)}
			/>
		</>
	);
}