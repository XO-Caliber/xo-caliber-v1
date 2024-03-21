"use client";
import { ChevronDown, GripVertical, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import AddSubSectionDialog from "./AddSubSectionDialog";
import { trpc } from "@/app/_trpc/client";
import { PositionType, SectionType } from "@/types/CoverLetter";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";

const DragNDropSection = ({ userId, coverLetterId }: { userId: string; coverLetterId: string }) => {
  //@ts-ignore
  const data = trpc.coverletter.getAdminSections.useQuery<SectionType[]>(coverLetterId);

  const { data: SectionsData, isLoading, error } = data;

  const { mutate: updateSectionPostion } = trpc.coverletter.updateSectionPostion.useMutation({
    onSuccess({ success }) {
      if (success) {
        data.refetch();
        toast({
          title: "section updated",
          description: "Successfully updated the section"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const [sections, setSections] = useState<SectionType[]>();
  const [updatedSections, setupdatedSections] = useState<PositionType[]>();

  useEffect(() => {
    if (SectionsData && !isLoading && !error) {
      setSections(SectionsData);
    }
  }, [SectionsData, isLoading, error]);

  const handleDragDrop = (results: DropResult) => {
    console.log(JSON.stringify(results));
    // setDropData(results);
    const { source, destination, type } = results;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    if (type === "group" && sections) {
      const reOrderedStore = [...sections];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reOrderedStore.splice(sourceIndex, 1);
      reOrderedStore.splice(destinationIndex, 0, removedStore);

      const updatedSections = reOrderedStore.map((section, index) => ({
        ...section,
        position: index
      }));

      console.log("reorderedStore: ", reOrderedStore);
      console.log("updatedSections: ", updatedSections);

      const sectionPositions = updatedSections.map((section) => ({
        id: section.id,
        position: section.position
      }));

      console.log("sectionPositions: ", JSON.stringify(sectionPositions));

      setupdatedSections(sectionPositions);
      return setSections(updatedSections);
    }
    // const sectionSourceIndex = sections.findIndex((section) => section.id === source.droppableId);
    // const sectionDestinationIndex = sections.findIndex(
    //   (section) => section.id === destination.droppableId
    // );

    // const newSourceItems = [...sections[sectionSourceIndex].exhibits];
    // const newDestinationItems =
    //   source.droppableId != destination.droppableId
    //     ? [...sections[sectionDestinationIndex].exhibits]
    //     : newSourceItems;

    // const [deletedItems] = newSourceItems.splice(source.index, 1);
    // newDestinationItems.splice(destination.index, 0, deletedItems);

    // const newSections = [...sections];

    // newSections[sectionSourceIndex] = {
    //   ...sections[sectionSourceIndex],
    //   exhibits: newSourceItems
    // };

    // newSections[sectionDestinationIndex] = {
    //   ...sections[sectionDestinationIndex],
    //   exhibits: newDestinationItems
    // };

    // setSections(newSections);
  };

  // console.log(sections);

  const updatePostionInDb = () => {
    if (updatedSections) updateSectionPostion(updatedSections);
  };

  return (
    <main className="h-max w-full p-2 pt-0">
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <main className="w-full" {...provided.droppableProps} ref={provided.innerRef}>
              {sections &&
                sections.map((section, index) => (
                  <Draggable draggableId={section.id} key={section.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="text-center"
                      >
                        <Droppable droppableId={section.id}>
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="">
                              <section className="flex h-full w-full items-center justify-normal gap-6 border border-border bg-secondary p-3">
                                <GripVertical size={18} className="w-16" />
                                <ChevronDown size={18} className="w-16" />
                                {/* <h1 className="text-base">Section-{index + 1}</h1> */}
                                <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                  Section-{index + 1}
                                </h2>
                                <p className="w-full cursor-pointer overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                  {section.title}
                                </p>
                                <p className="m-0">
                                  <AddSubSectionDialog userId={userId} sectionId={section.id} />
                                </p>
                                <p>{section.position}</p>
                                <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                  <MessageCircle size={16} />
                                  Comment
                                </i>
                              </section>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </main>
          )}
        </Droppable>
      </DragDropContext>
      {updatedSections && (
        <div className="flex w-full justify-end gap-8 rounded-b-md border border-t-0 px-4 py-2 ">
          <Button variant={"secondary"}>Cancel</Button>
          <Button variant={"primary"} onClick={updatePostionInDb}>
            Save chanegs
          </Button>
        </div>
      )}
    </main>
  );
};

export default DragNDropSection;
