"use client";
import { ChevronDown, ChevronRight, GripVertical, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import AddSubSectionDialog from "./AddSubSectionDialog";
import { trpc } from "@/app/_trpc/client";
import {
  ExhibitPositionType,
  SectionPositionType,
  SectionType,
  SubSectionPositionType
} from "@/types/CoverLetter";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import AddDialog from "./AddDialog";

const DragNDropSection = ({ userId, coverLetterId }: { userId: string; coverLetterId: string }) => {
  //@ts-ignore
  const data = trpc.coverletter.getAdminSections.useQuery<SectionType[]>(coverLetterId);

  const { data: SectionsData, isLoading, error } = data;

  const { mutate: updateSectionPostion } = trpc.coverletter.updateSectionPostion.useMutation({
    onSuccess({ success }) {
      if (success) {
        data.refetch();
        toast({
          title: "section postion updated",
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

  const { mutate: updateSubSectionPostion } = trpc.coverletter.updateSubSectionPostion.useMutation({
    onSuccess({ success }) {
      if (success) {
        data.refetch();
        toast({
          title: "SubSections postion updated",
          description: "Successfully updated the SubSection"
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

  const { mutate: updateExhibitPostion } = trpc.coverletter.updateExhibitPostion.useMutation({
    onSuccess({ success }) {
      if (success) {
        data.refetch();
        toast({
          title: "Exhibits postion updated",
          description: "Successfully updated the Exhibit"
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

  const [isSubSectionVisible, setIsSubSectionVisible] = useState<{ [key: number]: boolean }>({});

  const [updatedSectionsPosition, setupdatedSectionsPosition] = useState<SectionPositionType[]>();
  const [updatedSubSectionsPosition, setupdatedSubSectionsPosition] =
    useState<SubSectionPositionType[]>();
  const [updatedExhibitsPosition, setUpdatedExhibitsPosition] = useState<ExhibitPositionType[]>();

  useEffect(() => {
    if (SectionsData && !isLoading && !error) {
      setSections(SectionsData);
    }
  }, [SectionsData, isLoading, error]);

  const handleDragDrop = (results: DropResult) => {
    console.log(JSON.stringify(results));
    // setDropData(results);
    const { source, destination, type, draggableId } = results;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    if (sections) {
      if (type === "group") {
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

        setupdatedSectionsPosition(sectionPositions);
        return setSections(updatedSections);
      }

      if (type === "section") {
        const sectionSourceIndex = sections.findIndex(
          (section) => section.id === source.droppableId
        );
        const sectionDestinationIndex = sections.findIndex(
          (section) => section.id === destination.droppableId
        );

        const newSourceItems = [...sections[sectionSourceIndex].SubSection];
        const newDestinationItems =
          source.droppableId != destination.droppableId
            ? [...sections[sectionDestinationIndex].SubSection]
            : newSourceItems;

        const [deletedItems] = newSourceItems.splice(source.index, 1);
        newDestinationItems.splice(destination.index, 0, deletedItems);

        const newSections = [...sections];

        newSections[sectionSourceIndex] = {
          ...sections[sectionSourceIndex],
          SubSection: newSourceItems
        };

        newSections[sectionDestinationIndex] = {
          ...sections[sectionDestinationIndex],
          SubSection: newDestinationItems
        };
        console.log("newSection: ", newSections);

        const subSectionPostions = newSections.flatMap((section) =>
          section.SubSection.map((subsection, index) => ({
            id: subsection.id,
            sectionId: section.id,
            position: index
          }))
        );
        console.log("subSectionPostion: ", subSectionPostions);
        setupdatedSubSectionsPosition(subSectionPostions);
        setSections(newSections);
      }

      if (type === "subsection") {
        const updatedSections = sections.map((section) => {
          const sourceSubSection = section.SubSection.find(
            (subSection) => subSection.id === source.droppableId
          );
          const destinationSubSection = section.SubSection.find(
            (subSection) => subSection.id === destination.droppableId
          );

          if (!sourceSubSection || !destinationSubSection) return section;

          // Find the dragged exhibit
          const draggedExhibitIndex = sourceSubSection.Exhibits.findIndex(
            (exhibit) => exhibit.id === draggableId
          );
          if (draggedExhibitIndex === -1) return section;

          const draggedExhibit = sourceSubSection.Exhibits[draggedExhibitIndex];

          // Remove the dragged exhibit from the source subsection
          sourceSubSection.Exhibits.splice(draggedExhibitIndex, 1);

          // Insert the dragged exhibit into the destination subsection at the specified index
          destinationSubSection.Exhibits.splice(destination.index, 0, draggedExhibit);

          // Update positions if necessary
          if (sourceSubSection.id === destinationSubSection.id) {
            // If the drag is within the same subsection, update positions for affected exhibits
            destinationSubSection.Exhibits.forEach((exhibit, index) => {
              exhibit.position = index;
            });
          } else {
            // If the drag is between different subsections, update positions for both source and destination subsections
            sourceSubSection.Exhibits.forEach((exhibit, index) => {
              exhibit.position = index;
            });

            destinationSubSection.Exhibits.forEach((exhibit, index) => {
              exhibit.position = index;
              exhibit.subSectionId = destinationSubSection.id;
            });
          }

          return section;
        });
        console.log(updatedSections);
        setSections(updatedSections);
        const exhibitPositions = sections.flatMap((section) =>
          section.SubSection.flatMap((subSection) =>
            subSection.Exhibits.map((exhibit, index) => ({
              id: exhibit.id,
              subSectionId: exhibit.subSectionId,
              position: index
            }))
          )
        );
        console.log("exhibitPositions: ", exhibitPositions);
        setUpdatedExhibitsPosition(exhibitPositions);
      }
    }
  };

  const updateSectionPostionInDb = () => {};

  const updateSubSectionPostionInDb = () => {
    if (updatedSectionsPosition) updateSectionPostion(updatedSectionsPosition);
    if (updatedSubSectionsPosition) updateSubSectionPostion(updatedSubSectionsPosition);
    if (updatedExhibitsPosition) updateExhibitPostion(updatedExhibitsPosition);
  };

  const toggleSubSection = (id: string, index: number) => {
    setIsSubSectionVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
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
                        <Droppable droppableId={section.id} type="section">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="">
                              <section className="flex h-full w-full items-center justify-normal gap-6 border border-border bg-secondary p-3">
                                <GripVertical size={18} className="w-16" />
                                <button
                                  onClick={() => toggleSubSection(section.id, index)}
                                  className="hover:selector"
                                >
                                  {isSubSectionVisible[index] ? (
                                    <ChevronDown size={18} className="w-16" />
                                  ) : (
                                    <ChevronRight size={18} className="w-16" />
                                  )}
                                </button>
                                {/* <h1 className="text-base">Section-{index + 1}</h1> */}
                                <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                  Section-{index + 1}
                                </h2>
                                <p className="w-full cursor-pointer overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                  {section.title}
                                </p>
                                <p className="m-0">
                                  {/* <AddSubSectionDialog userId={userId} sectionId={section.id} /> */}
                                  <AddDialog
                                    userId={userId}
                                    itemId={section.id}
                                    dialogType="subSection"
                                  />
                                </p>
                                <p>{section.position}</p>
                                <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                  <MessageCircle size={16} />
                                  Comment
                                </i>
                              </section>
                              {/* Subsection Drag and Drop */}
                              <div
                                className={`${isSubSectionVisible[index] ? "h-auto" : "hidden h-0"}`}
                              >
                                {section.SubSection.map((subsection, index) => (
                                  <Draggable
                                    draggableId={subsection.id}
                                    key={subsection.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                        className=""
                                      >
                                        <Droppable droppableId={subsection.id} type="subsection">
                                          {(provided) => (
                                            <div
                                              {...provided.droppableProps}
                                              ref={provided.innerRef}
                                              className=""
                                            >
                                              <section className="flex h-full w-full items-center justify-normal gap-6 border border-border bg-white p-3 pl-12">
                                                <GripVertical size={18} className="w-16" />
                                                <ChevronDown size={18} className="w-16" />
                                                <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                                  Sub-Section-{index + 1}
                                                </h2>
                                                <p className="w-full cursor-pointer overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                                  {subsection.title}
                                                </p>
                                                <p>{subsection.id}</p>
                                                <p className="m-0">
                                                  {/* <AddSubSectionDialog userId={userId} sectionId={subsection.id} /> */}
                                                  <AddDialog
                                                    userId={userId}
                                                    itemId={subsection.id}
                                                    dialogType="exhibit"
                                                  />
                                                </p>
                                                <p>{subsection.position}</p>
                                                <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                                  <MessageCircle size={16} />
                                                  Comment
                                                </i>
                                              </section>
                                              {subsection.Exhibits.map((exhibit, index) => (
                                                <Draggable
                                                  draggableId={exhibit.id}
                                                  key={exhibit.id}
                                                  index={index}
                                                >
                                                  {(provided) => (
                                                    <div
                                                      {...provided.dragHandleProps}
                                                      {...provided.draggableProps}
                                                      ref={provided.innerRef}
                                                    >
                                                      <section className="flex h-full w-full items-center justify-normal gap-6 border border-border bg-white p-3 pl-16">
                                                        <GripVertical size={18} className="w-16" />
                                                        <h2 className="text-nowrap rounded-md border border-border bg-white p-1 text-sm font-semibold">
                                                          Exhibit-{index + 1}
                                                        </h2>
                                                        <p className="w-full cursor-pointer overflow-hidden overflow-ellipsis text-nowrap text-left text-[15px] font-medium ">
                                                          {exhibit.title}
                                                        </p>
                                                        <p>{exhibit.position}</p>
                                                        <i className="ml-auto mr-8 flex flex-row items-center justify-items-end gap-1 text-base">
                                                          <MessageCircle size={16} />
                                                          Comment
                                                        </i>
                                                      </section>
                                                    </div>
                                                  )}
                                                </Draggable>
                                              ))}
                                              {provided.placeholder}
                                            </div>
                                          )}
                                        </Droppable>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              </div>
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
      {updatedSectionsPosition || updatedSubSectionsPosition || updatedExhibitsPosition ? (
        <div className="flex w-full justify-end gap-8 rounded-b-md border border-t-0 px-4 py-2 ">
          <Button variant={"secondary"}>Cancel</Button>
          <Button variant={"primary"} onClick={updateSubSectionPostionInDb}>
            Save changes
          </Button>
        </div>
      ) : null}
    </main>
  );
};

export default DragNDropSection;
