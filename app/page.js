import Events from "@/components/Events";

export default async function Home({ searchParams }) {
  return <Events searchParams={searchParams} />;
}
