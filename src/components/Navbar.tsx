import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { auth, signIn, signOut } from "../../auth"
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type Props = object

export default async function Navbar({}: Props) {
  const session = await auth() 

  const handleLogin = async () => {
    "use server"

    await signIn("github")
  }

  const handleLogout = async () => {
    "use server"

    await signOut({ redirectTo: "/" })
  }

  return (
		<header className="px-5 py-3 bg-white shadow-sm font-work-sans">
			<nav className="flex justify-between items-center">
				<Link href="/">
					<Image
						src="/logo.png"
						alt="logo"
						width={144}
						height={30}
					/>
				</Link>

				<div className="flex items-center gap-5 text-black">
					{session && session?.user ? (
						<>
							<Link href="/startup/create">
								<span>Create</span>
							</Link>
							<form action={handleLogout}>
								<button type="submit">
									Logout
									<LogOut className="size-6 sm:hidden text-red-500" />
								</button>
							</form>

							<Link href={`/user/${session?.id}`}>
								<Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
							</Link>
						</>
					) : (
						<form action={handleLogin}>
							<button type="submit">Login</button>
						</form>
					)}
				</div>
			</nav>
		</header>
	)
}