import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { parseStringify } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";
import { json } from "stream/consumers";

const Documents = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const room = (await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  })) as any;
  // TODO: Assess the permission of the user to access the document

  return (
    <div className="flex flex-col w-full items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={[]}
        currentUserType={"editor"}
      />
    </div>
  );
};

export default Documents;
