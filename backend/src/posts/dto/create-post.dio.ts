export class CreatePostDto {
  slug!: string;
  title!: string;
  description!: string;
  date!: string;
  tags!: string[];
  content!: string;
}
