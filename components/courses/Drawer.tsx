import React from "react";
import type { Course } from "@/types/courses.types";
import { GetView, ReportView } from "@/components/courses/view";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button";
import { CoursePopUpInfo } from "@/components/courses/CoursePopUpInfo";
import {useMediaQuery} from "@/lib/hooks/use-media-query";

interface CourseDrawerProps {
  currentItem: Course;
  onOpenChange: () => void;
}

const CourseDrawer: React.FC<CourseDrawerProps> = ({
  currentItem,
  onOpenChange,
}) => {
  const [open, setOpen] = React.useState<boolean>(true);

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleClose = () => {
    setOpen(false);
    onOpenChange();
  };

  if (isDesktop) {
    return (
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentItem.courseName}</DialogTitle>
              <DialogDescription>
                <GetView id={currentItem._id} />
              </DialogDescription>
            </DialogHeader>
            <CoursePopUpInfo currentItem={currentItem} />
            <div className="flex flex-row gap-4 justify-center">
              <Link href={`/c/${currentItem.slug.current}`} target='_blank'>
                <Button>
                  <span className="">View</span>
                </Button>
              </Link>
              <Button onClick={handleClose} variant="outline">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    )
  }

  return (
    <div className="md:px-4">
      <ReportView id={currentItem._id} />
      <Drawer onClose={onOpenChange} open={open}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{currentItem.courseName}</DrawerTitle>
            <DrawerDescription>
              <GetView id={currentItem._id} />
            </DrawerDescription>
          </DrawerHeader>
          <CoursePopUpInfo currentItem={currentItem} />
          <DrawerFooter>
            <DrawerClose className="flex flex-row gap-2 justify-center">
              <Link href={`/c/${currentItem.slug.current}`} target="_blank">
                <Button>
                  <span className="">View</span>
                </Button>
              </Link>
              <Button onClick={handleClose} variant="outline">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CourseDrawer;
