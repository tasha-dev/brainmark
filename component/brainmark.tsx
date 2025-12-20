// Forcing next.js to render this component as client side component
"use client";

// Codes by mahdi tasha
// Importing part
import { JSX, useState } from "react";
import { cn, copyToClipboard } from "@/lib/util";
import { BrainMarkProps } from "@/type/component";
import { Copy, Eye, Pen, Tag, Trash } from "lucide-react";
import moment from "moment";
import { Badge } from "@/component/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import useGet from "@/hook/useGet";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import DeleteBrainMark from "./dialog/deleteBrainMark";

// Defining global scoped variables
const apiKey: string = process.env.NEXT_PUBLIC_FLASH_API_KEY || "";

// Creating and exporting BrainMark component as default
export default function BrainMark({
  className,
  data,
}: BrainMarkProps): JSX.Element {
  // Defining hooks
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const imgData = useGet(
    `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&wait_until=page_loaded&url=${data.url}`,
  );

  // Returning JSX
  return (
    <>
      <DeleteBrainMark
        id={data.id}
        onOpenChange={setDeleteDialogOpened}
        open={deleteDialogOpened}
      />
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link href={data.url}>
            <Card className={cn("pt-0 overflow-hidden", className)}>
              {imgData.loading ? (
                <Skeleton className="h-[150px] bg-foreground/10 rounded-none" />
              ) : imgData.isError ? (
                <div className="h-[150px] bg-destructive w-full" />
              ) : (
                <Image
                  alt={data.url}
                  src={imgData.data || ""}
                  width={500}
                  height={500}
                  className="h-[150px] object-cover pointer-events-auto w-full bg-foreground"
                />
              )}
              <CardHeader>
                <CardTitle className="truncate">{data.url}</CardTitle>
                <CardDescription>{data.why}</CardDescription>
                <span className="text-muted-foreground text-xs">
                  {moment(data.createdAt).format("YYYY/MM/DD HH:MM")}
                </span>
              </CardHeader>
              {data.tags && (
                <CardFooter className="flex items-center justify-start gap-2 flex-wrap">
                  {data.tags.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-current/10 border border-current/15 text-current"
                      style={{
                        color: item.color,
                      }}
                    >
                      <Tag />
                      <span>{item.label}</span>
                    </Badge>
                  ))}
                </CardFooter>
              )}
            </Card>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="cursor-pointer"
            onClick={async () => await copyToClipboard(data.url)}
          >
            <Copy />
            Copy the link
          </ContextMenuItem>
          <ContextMenuItem className="cursor-pointer" asChild>
            <Link href={data.url} target="_blank">
              <Eye />
              Visit the bookmark
            </Link>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="cursor-pointer">
            <Pen />
            Edit the bookmark
          </ContextMenuItem>
          <ContextMenuItem
            className="cursor-pointer"
            variant="destructive"
            onClick={() => setDeleteDialogOpened(true)}
          >
            <Trash />
            Delete the bookmark
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
