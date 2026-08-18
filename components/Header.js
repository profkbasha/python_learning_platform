'use client';
import Link from 'next/link'; import {logout} from './AuthGate';
export default function Header({profile}){return <header><Link href="/learn" className="brand">🐍 Python Learning</Link><nav><Link href="/live">Live</Link>{profile?.admin&&<Link href="/admin">Admin</Link>}<button className="linkbtn" onClick={logout}>Logout</button></nav></header>}
