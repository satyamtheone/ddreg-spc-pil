import FullPageEditor from "./fullPageEditor";

export type FullPageEditorSearchParams = {
  documentBufferUrl?: string;
  versionId?: string;
  type?: string;
  region?: string;
  role?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<FullPageEditorSearchParams>;
}) {
  const params = await searchParams;
  
  return <FullPageEditor params={params} />;
}
