import Image from "next/image";
import heart from "@/public/assets/heart-gray.svg";
import reply from "@/public/assets/reply.svg";
import share from "@/public/assets/share.svg";
import repost from "@/public/assets/repost.svg";
import { FC } from "react";
import { TThreadButtonsProps } from "@/types/types";
import Link from "next/link";

const ThreadButtons: FC<TThreadButtonsProps> = ({ id }) => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <button type="button">
        <Image src={heart} alt="like icon" width={25} height={25} />
      </button>

      <button type="button">
        <Link href={`/thread/${id}`}>
          <Image src={reply} alt="reply icon" width={25} height={25} />
        </Link>
      </button>

      <button type="button">
        <Image src={share} alt="share icon" width={25} height={25} />
      </button>

      <button type="button">
        <Image src={repost} alt="repost icon" width={25} height={25} />
      </button>
    </div>
  );
};

export default ThreadButtons;
