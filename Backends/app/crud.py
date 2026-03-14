from sqlalchemy.orm import Session
from . import models, schemas


def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def get_employees(db: Session):
    return db.query(models.Employee).all()


def delete_employee(db: Session, employee_id: str):
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

    if employee:
        db.delete(employee)
        db.commit()

    return employee


def create_attendance(db: Session, attendance: schemas.AttendanceCreate):
    db_attendance = models.Attendance(**attendance.dict())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance


def get_attendance_by_employee(db: Session, employee_id: str):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()