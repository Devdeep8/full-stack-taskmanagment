import ProfileComponent from "@/components/profilecompoenet"

export default async function Profile({params}) {
    const {username} = await params
  return (
    <div className="bg-dark ">
        <ProfileComponent/>
    </div>
  )
}
