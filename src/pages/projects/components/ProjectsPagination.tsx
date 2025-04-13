
import React from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface ProjectsPaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const ProjectsPagination: React.FC<ProjectsPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  paginate 
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => paginate(currentPage - 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink 
              isActive={currentPage === index + 1}
              onClick={() => paginate(index + 1)}
              className="cursor-pointer"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => paginate(currentPage + 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ProjectsPagination;
