import Link from "next/link";

export default function Home() {
  return (
    <Link href="/auth/login">
      <button>라이프 시멘틱스 이용하기</button>
    </Link>
  );
}
