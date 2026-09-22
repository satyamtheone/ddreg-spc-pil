import GenerateDocument from "./generateDocument";

type SearchParams = {
  referenceId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return <GenerateDocument referenceId={params?.referenceId} />;
}
