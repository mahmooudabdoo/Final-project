import Navbar from "@/components/shared/Navbar"

type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <div className="w-screen h-screen">
        <Navbar />
        {children}
    </div>
  )
}
