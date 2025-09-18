import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface BlogCardProps {
  title: string
  createdAt: string
  tags: string[]
  imageUrl?: string
  imageAlt?: string
  href?: string
  className?: string
}

export function BlogCard({
  title,
  createdAt,
  tags,
  imageUrl,
  imageAlt,
  href,
  className,
}: BlogCardProps) {
  const CardWrapper = href ? "a" : "div"

  return (
    <CardWrapper href={href} className={className}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        )}

        <CardHeader>
          <CardTitle className="line-clamp-2 text-lg">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <time
            dateTime={createdAt}
            className="text-sm text-muted-foreground"
          >
            {new Date(createdAt).toLocaleDateString("ja-JP")}
          </time>
        </CardContent>

        <CardFooter>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </CardWrapper>
  )
}