class OdooAdapter:
    def list_courses(self):
        raise NotImplementedError
    def list_students(self):
        raise NotImplementedError
    def enroll_student(self, student_id, course_id):
        raise NotImplementedError

class MockOdooAdapter(OdooAdapter):
    def list_courses(self):
        return [{"id": 1, "title": "Curso Mock"}, {"id": 2, "title": "Python Básico"}]
    def list_students(self):
        return [{"id": 1, "name": "Estudiante Mock"}]
    def enroll_student(self, student_id, course_id):
        return {"ok": True, "student_id": student_id, "course_id": course_id}

def get_odoo_adapter():
    # RealOdooAdapter para mañana
    return MockOdooAdapter()
