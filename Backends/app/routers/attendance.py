from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from datetime import date
from .. import schemas, crud, models

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/")
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return crud.create_attendance(db, attendance)

@router.get("/{attendance_id}", response_model=schemas.AttendanceResponse)
def get_attendance_details(attendance_id: int, db: Session = Depends(get_db)):

    attendance = db.query(models.Attendance).filter(
        models.Attendance.id == attendance_id
    ).first()

    if not attendance:
        raise HTTPException(
            status_code=404,
            detail="Attendance record not found"
        )

    return attendance



@router.get("/", response_model=list[schemas.AttendanceResponse])
def filter_attendance(
    employee_id: str | None = Query(None),
    date: date | None = Query(None),
    status: str | None = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(models.Attendance)

    if employee_id:
        query = query.filter(models.Attendance.employee_id == employee_id)

    if date:
        query = query.filter(models.Attendance.date == date)

    if status:
        query = query.filter(models.Attendance.status == status)

    return query.all()